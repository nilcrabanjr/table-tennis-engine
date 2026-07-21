import { Route, Routes } from "react-router";

import { AppLayout } from "./layouts/AppLayout";
import { CountriesPage } from "./pages/CountriesPage";
import { EquipmentPage } from "./pages/EquipmentPage";
import { HomePage } from "./pages/HomePage";
import { LiveMatchPage } from "./pages/LiveMatchPage";
import { MatchSetupPage } from "./pages/MatchSetupPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PlayersPage } from "./pages/PlayersPage";
import { SettingsPage } from "./pages/SettingsPage";
import { TournamentsPage } from "./pages/TournamentsPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="countries" element={<CountriesPage />} />
        <Route path="players" element={<PlayersPage />} />
        <Route path="equipment" element={<EquipmentPage />} />
        <Route path="match-setup" element={<MatchSetupPage />} />
        <Route path="live-match" element={<LiveMatchPage />} />
        <Route path="tournaments" element={<TournamentsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;