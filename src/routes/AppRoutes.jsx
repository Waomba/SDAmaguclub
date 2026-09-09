import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import AdminRoute from './AdminRoute.jsx';

// Auth pages
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';
import ForgotPassword from '../pages/auth/ForgotPassword.jsx';
import ResetPassword from '../pages/auth/ResetPassword.jsx';

// Main pages
import Dashboard from '../pages/Dashboard.jsx';
import Members from '../pages/Members.jsx';
import MemberProfile from '../pages/MemberProfile.jsx';
import Attendance from '../pages/Attendance.jsx';
import AttendanceDetails from '../pages/AttendanceDetails.jsx';
import Events from '../pages/Events.jsx';
import EventDetails from '../pages/EventDetails.jsx';
import SabbathTimes from '../pages/SabbathTimes.jsx';
import ConnectPastor from '../pages/ConnectPastor.jsx';
import Community from '../pages/Community.jsx';
import CommunityGroups from '../pages/CommunityGroups.jsx';
import CommunityGroupDetail from '../pages/CommunityGroupDetail.jsx';
import CommunityMessages from '../pages/CommunityMessages.jsx';
import CommunityChat from '../pages/CommunityChat.jsx';
import FindChurch from '../pages/FindChurch.jsx';
import Gallery from '../pages/Gallery.jsx';
import BibleBooks from '../pages/BibleBooks.jsx';
import BibleChapter from '../pages/BibleChapter.jsx';
import BibleVerse from '../pages/BibleVerse.jsx';
import BooksLibrary from '../pages/BooksLibrary.jsx';
import BookDetails from '../pages/BookDetails.jsx';
import BookReaderPage from '../pages/BookReaderPage.jsx';
import ChurchBudget from '../pages/ChurchBudget.jsx';
import AddBudgetTransaction from '../pages/AddBudgetTransaction.jsx';
import ManageAccounts from '../pages/ManageAccounts.jsx';
import Notifications from '../pages/Notifications.jsx';
import Settings from '../pages/Settings.jsx';
import ChurchProfile from '../pages/ChurchProfile.jsx';
import Website from '../pages/Website.jsx';
import Pathfinders from '../pages/Pathfinders.jsx';

// Admin pages
import AdminDashboard from '../admin/AdminDashboard.jsx';
import AdminMembers from '../admin/members/AdminMembers.jsx';
import AdminMemberProfile from '../admin/members/AdminMemberProfile.jsx';
import MemberStatistics from '../admin/members/MemberStatistics.jsx';
import AdminAttendance from '../admin/attendance/AdminAttendance.jsx';
import RecordAttendance from '../admin/attendance/RecordAttendance.jsx';
import EditAttendance from '../admin/attendance/EditAttendance.jsx';
import AttendanceReports from '../admin/attendance/AttendanceReports.jsx';
import AdminEvents from '../admin/events/AdminEvents.jsx';
import AdminEventDetails from '../admin/events/AdminEventDetails.jsx';
import Participants from '../admin/events/Participants.jsx';
import EventStatistics from '../admin/events/EventStatistics.jsx';
import AdminCommunity from '../admin/community/AdminCommunity.jsx';
import Posts from '../admin/community/Posts.jsx';
import Groups from '../admin/community/Groups.jsx';
import Reports from '../admin/community/Reports.jsx';
import Moderation from '../admin/community/Moderation.jsx';
import PastorMessages from '../admin/pastor/PastorMessages.jsx';
import AdminGallery from '../admin/gallery/AdminGallery.jsx';
import Media from '../admin/gallery/Media.jsx';
import Albums from '../admin/gallery/Albums.jsx';
import AdminBooks from '../admin/books/AdminBooks.jsx';
import Library from '../admin/books/Library.jsx';
import AdminChurches from '../admin/churches/AdminChurches.jsx';
import ChurchDetails from '../admin/churches/ChurchDetails.jsx';
import AdminBudget from '../admin/budget/AdminBudget.jsx';
import Income from '../admin/budget/Income.jsx';
import Expenses from '../admin/budget/Expenses.jsx';
import BudgetReports from '../admin/budget/BudgetReports.jsx';
import AdminSettings from '../admin/settings/AdminSettings.jsx';
import Users from '../admin/settings/Users.jsx';
import Permissions from '../admin/settings/Permissions.jsx';

// Ported from index.php's `?page=` router (member-facing pages) and
// admin/index.php's router (admin section). Every page is wrapped in
// PageLayout so the topbar/drawer/bottom-nav persist across navigation,
// matching includes/header.php + includes/footer.php being included on
// every PHP page.
export default function AppRoutes() {
  return (
    <PageLayout>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Public / member pages */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/members" element={<Members />} />
        <Route path="/members/:id" element={<MemberProfile />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/attendance/:eventId" element={<AttendanceDetails />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/sabbath-times" element={<SabbathTimes />} />
        <Route path="/connect-pastor" element={<ConnectPastor />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/groups" element={<ProtectedRoute><CommunityGroups /></ProtectedRoute>} />
        <Route path="/community/groups/:id" element={<ProtectedRoute><CommunityGroupDetail /></ProtectedRoute>} />
        <Route path="/community/messages" element={<ProtectedRoute><CommunityMessages /></ProtectedRoute>} />
        <Route path="/community/messages/:userId" element={<ProtectedRoute><CommunityChat /></ProtectedRoute>} />
        <Route path="/find-church" element={<FindChurch />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/bible" element={<BibleBooks />} />
        <Route path="/bible/search" element={<BibleVerse />} />
        <Route path="/bible/:bookId" element={<BibleChapter />} />
        <Route path="/bible/:bookId/:chapter" element={<BibleVerse />} />
        <Route path="/books" element={<BooksLibrary />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/books/chapter/:chapterId" element={<BookReaderPage />} />
        <Route path="/church-budget" element={<ChurchBudget />} />
        <Route path="/church-budget/add" element={<ProtectedRoute><AddBudgetTransaction /></ProtectedRoute>} />
        <Route path="/church-budget/accounts" element={<ProtectedRoute><ManageAccounts /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/church-profile" element={<ChurchProfile />} />
        <Route path="/website" element={<Website />} />
        <Route path="/pathfinders" element={<Pathfinders />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/members" element={<AdminRoute><AdminMembers /></AdminRoute>} />
        <Route path="/admin/members/:id" element={<AdminRoute><AdminMemberProfile /></AdminRoute>} />
        <Route path="/admin/members/statistics" element={<AdminRoute><MemberStatistics /></AdminRoute>} />
        <Route path="/admin/attendance" element={<AdminRoute><AdminAttendance /></AdminRoute>} />
        <Route path="/admin/attendance/record/:eventId" element={<AdminRoute><RecordAttendance /></AdminRoute>} />
        <Route path="/admin/attendance/edit/:eventId" element={<AdminRoute><EditAttendance /></AdminRoute>} />
        <Route path="/admin/attendance/reports" element={<AdminRoute><AttendanceReports /></AdminRoute>} />
        <Route path="/admin/events" element={<AdminRoute><AdminEvents /></AdminRoute>} />
        <Route path="/admin/events/:id" element={<AdminRoute><AdminEventDetails /></AdminRoute>} />
        <Route path="/admin/events/:id/participants" element={<AdminRoute><Participants /></AdminRoute>} />
        <Route path="/admin/events/:id/statistics" element={<AdminRoute><EventStatistics /></AdminRoute>} />
        <Route path="/admin/community" element={<AdminRoute><AdminCommunity /></AdminRoute>} />
        <Route path="/admin/community/posts" element={<AdminRoute><Posts /></AdminRoute>} />
        <Route path="/admin/community/groups" element={<AdminRoute><Groups /></AdminRoute>} />
        <Route path="/admin/community/reports" element={<AdminRoute><Reports /></AdminRoute>} />
        <Route path="/admin/community/moderation" element={<AdminRoute><Moderation /></AdminRoute>} />
        <Route path="/admin/pastor" element={<AdminRoute><PastorMessages /></AdminRoute>} />
        <Route path="/admin/gallery" element={<AdminRoute><AdminGallery /></AdminRoute>} />
        <Route path="/admin/gallery/media" element={<AdminRoute><Media /></AdminRoute>} />
        <Route path="/admin/gallery/albums" element={<AdminRoute><Albums /></AdminRoute>} />
        <Route path="/admin/books" element={<AdminRoute><AdminBooks /></AdminRoute>} />
        <Route path="/admin/books/library" element={<AdminRoute><Library /></AdminRoute>} />
        <Route path="/admin/churches" element={<AdminRoute><AdminChurches /></AdminRoute>} />
        <Route path="/admin/churches/:id" element={<AdminRoute><ChurchDetails /></AdminRoute>} />
        <Route path="/admin/budget" element={<AdminRoute><AdminBudget /></AdminRoute>} />
        <Route path="/admin/budget/income" element={<AdminRoute><Income /></AdminRoute>} />
        <Route path="/admin/budget/expenses" element={<AdminRoute><Expenses /></AdminRoute>} />
        <Route path="/admin/budget/reports" element={<AdminRoute><BudgetReports /></AdminRoute>} />
        <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />
        <Route path="/admin/settings/users" element={<AdminRoute superOnly><Users /></AdminRoute>} />
        <Route path="/admin/settings/permissions" element={<AdminRoute superOnly><Permissions /></AdminRoute>} />

        <Route path="*" element={<Dashboard />} />
      </Routes>
    </PageLayout>
  );
}
