import React, { useState, useEffect, useRef } from 'react';

// Debounces typing so we don't hit the Places API on every keystroke
function useDebouncedValue(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

/**
 * Google-Maps-style autocomplete search for "Other SDA Churches".
 *
 * Props:
 * - query, onQueryChange, onSearch: same as before (kept compatible with FindChurch.jsx)
 * - onSelectPlace(place): optional — fires when the user picks a suggestion,
 *   with { name, address, phone, latitude, longitude } pulled from Google Places.
 *   FindChurch.jsx can use this to prefill the "Add a church" form.
 *
 * Requires the Google Maps JS API (with the "places" library) loaded on the
 * page, e.g. in index.html:
 *   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&libraries=places" defer></script>
 */
export default function ChurchSearch({ query, onQueryChange, onSearch, onSelectPlace }) {
  const [predictions, setPredictions] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [mapsReady, setMapsReady] = useState(false);

  const autocompleteService = useRef(null);
  const placesService = useRef(null);
  const sessionToken = useRef(null);
  const wrapperRef = useRef(null);

  const debouncedQuery = useDebouncedValue(query, 250);

  // Wait for the Google Maps script to finish loading (it may load async)
  useEffect(() => {
    if (window.google?.maps?.places) {
      initGoogleServices();
      return;
    }
    const interval = setInterval(() => {
      if (window.google?.maps?.places) {
        initGoogleServices();
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  function initGoogleServices() {
    autocompleteService.current = new window.google.maps.places.AutocompleteService();
    placesService.current = new window.google.maps.places.PlacesService(document.createElement('div'));
    sessionToken.current = new window.google.maps.places.AutocompleteSessionToken();
    setMapsReady(true);
  }

  // Fetch predictions whenever the (debounced) query changes
  useEffect(() => {
    const term = debouncedQuery.trim();
    if (!term || !mapsReady) {
      setPredictions([]);
      return;
    }
    autocompleteService.current.getPlacePredictions(
      {
        input: term,
        sessionToken: sessionToken.current,
        // Bias toward churches/places of worship, but don't hard-restrict —
        // "sda", "area 30", etc. should still match.
        types: ['establishment'],
      },
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          setPredictions(results);
          setOpen(true);
          setActiveIndex(-1);
        } else {
          setPredictions([]);
        }
      }
    );
  }, [debouncedQuery, mapsReady]);

  // Close the dropdown when clicking outside it
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePick = (prediction) => {
    onQueryChange(prediction.description);
    setOpen(false);
    setPredictions([]);
    onSearch(prediction.description);

    if (placesService.current) {
      placesService.current.getDetails(
        {
          placeId: prediction.place_id,
          fields: ['name', 'formatted_address', 'geometry', 'formatted_phone_number'],
          sessionToken: sessionToken.current,
        },
        (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
            onSelectPlace?.({
              name: place.name || prediction.structured_formatting?.main_text || '',
              address: place.formatted_address || '',
              phone: place.formatted_phone_number || '',
              latitude: place.geometry?.location?.lat(),
              longitude: place.geometry?.location?.lng(),
            });
          }
          // start a fresh session token for the next search
          sessionToken.current = new window.google.maps.places.AutocompleteSessionToken();
        }
      );
    }
  };

  const highlightMatch = (text, matchedSubstrings = []) => {
    if (!text) return text;
    if (!matchedSubstrings || !matchedSubstrings.length) return <span>{text}</span>;
    const parts = [];
    let lastEnd = 0;
    matchedSubstrings.forEach(({ offset, length }, i) => {
      if (offset > lastEnd) parts.push(<span key={`n${i}`}>{text.slice(lastEnd, offset)}</span>);
      parts.push(<strong key={`b${i}`}>{text.slice(offset, offset + length)}</strong>);
      lastEnd = offset + length;
    });
    if (lastEnd < text.length) parts.push(<span key="tail">{text.slice(lastEnd)}</span>);
    return parts;
  };

  return (
    <div className="church-search" ref={wrapperRef}>
      <div className="church-search-input-row">
        <span className="church-search-icon" aria-hidden="true">🔍</span>
        <input
          type="text"
          value={query}
          placeholder="Search churches..."
          onChange={(e) => { onQueryChange(e.target.value); setOpen(true); }}
          onFocus={() => predictions.length && setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActiveIndex((i) => Math.min(i + 1, predictions.length - 1));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActiveIndex((i) => Math.max(i - 1, 0));
            } else if (e.key === 'Enter') {
              e.preventDefault();
              if (activeIndex >= 0 && predictions[activeIndex]) handlePick(predictions[activeIndex]);
              else { onSearch(query); setOpen(false); }
            } else if (e.key === 'Escape') {
              setOpen(false);
            }
          }}
        />
      </div>

      {open && predictions.length > 0 && (
        <ul className="church-autocomplete-dropdown" role="listbox">
          {predictions.map((p, i) => (
            <li
              key={p.place_id}
              role="option"
              aria-selected={i === activeIndex}
              className={`church-autocomplete-row${i === activeIndex ? ' active' : ''}`}
              onMouseDown={() => handlePick(p)}
              onMouseEnter={() => setActiveIndex(i)}
            >
              <span className="church-autocomplete-pin" aria-hidden="true">📍</span>
              <span className="church-autocomplete-text">
                <span className="church-autocomplete-main">
                  {highlightMatch(
                    p.structured_formatting?.main_text || p.description,
                    p.structured_formatting?.main_text_matched_substrings
                  )}
                </span>
                {p.structured_formatting?.secondary_text && (
                  <span className="church-autocomplete-secondary">
                    {' '}{p.structured_formatting.secondary_text}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
