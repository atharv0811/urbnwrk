import RootLayout from './RootLayout'
import { Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Bookings from './pages/bookings'
import User from './pages/user'
import BookingDetails from './pages/booking-details'
import UserDetails from './pages/user-details'
import Tickets from './pages/tickets'
import Broadcats from './pages/broadcast'
import Events from './pages/events'
import AddEvent from './pages/event-add'
import EventDetails from './pages/event-details'
import AddBroadcast from './pages/broadcast-add'
import BroadcastDetails from './pages/broadcast-details'
import { useEffect } from 'react'
import TicketsDetails from './pages/tickets-details'

const App = () => {
  const location = useLocation();

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltip) => {
      new window.bootstrap.Tooltip(tooltip);
    });
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="" element={<Dashboard />} />
        <Route path="tickets" element={<Tickets />} />
        <Route path="tickets/:id" element={<TicketsDetails />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="bookings/:id" element={<BookingDetails />} />
        <Route path="broadcast" element={<Broadcats />} />
        <Route path="broadcast/add-broadcast" element={<AddBroadcast />} />
        <Route path="broadcast/:id" element={<BroadcastDetails />} />
        <Route path="events" element={<Events />} />
        <Route path="events/add-event" element={<AddEvent />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="user" element={<User />} />
        <Route path="user/:id" element={<UserDetails />} />
      </Route>
    </Routes>
  )
}

export default App