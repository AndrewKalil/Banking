import React, { FC } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Account from "../../../pages/account";
import Accounts from "../../../pages/accounts";
import Home from "../../../pages/home";
import Transactions from "../../../pages/transactions";
import ContentTemplate from "../content-template";

interface RouterLayoutProps {}

const RouterLayout: FC<RouterLayoutProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<ContentTemplate />}>
        <Route element={<Outlet />}>
          <Route path="" element={<Home />} />

          <Route path="transactions" element={<Transactions />}></Route>
          <Route path="accounts" element={<Outlet />}>
            <Route path="" element={<Accounts />}></Route>
            <Route path=":id" element={<Account />}></Route>
          </Route>
        </Route>
        {/* <Route element={<ProtectedRoute />}>
          <Route path="" element={<HomePage />} />
          <Route path="leagues" element={<Outlet />}>
            <Route path="" element={<LeaguesPage />} />
            <Route path=":id" element={<DetailLeaguePage />} />
          </Route>

          <Route path="games" element={<Outlet />}>
            <Route path="" element={<GamesPage />} />
            <Route path=":id" element={<DetailGamePage />} />
          </Route>

          <Route path="bets" element={<Outlet />}>
            <Route path="" element={<BetsPage />} />
            <Route path=":id" element={<DetailBetPage />} />
          </Route>

          <Route path="news" element={<Outlet />}>
            <Route path="" element={<NewsPage />} />
            <Route path=":id" element={<DetailNewsPage />} />
          </Route>

          <Route path="profile" element={<Outlet />}>
            <Route path="" element={<ProfilePage />} />
          </Route>
        </Route>

        <Route path="admin" element={<ProtectedAdminRoute />}>
          <Route path="" element={<AdminHomePage />} />
          <Route path="games" element={<AdminGamesPage />} />
          <Route path="categories" element={<Outlet />}>
            <Route path="" element={<AdminGameCategoriesPage />} />
            <Route path="edit/:id" element={<AdminCategoriesEdit />} />
            <Route path=":id" element={<DetailCategoryPage />} />
            <Route path="create" element={<AdminCategoriesCreate />} />
          </Route>
          <Route path="teams" element={<AdminTeamsPage />} />
          <Route path="leagues" element={<Outlet />}>
            <Route path="" element={<AdminTournamentsPage />} />
            <Route path="create" element={<AdminTournamentsCreate />} />
            <Route path="edit/:id" element={<AdminTournamentsEdit />} />
          </Route>
          <Route path="users" element={<Outlet />}>
            <Route path="" element={<AdminUsersPage />} />
            <Route path="edit/:id" element={<AdminUsersEdit />} />
            <Route path=":id" element={<DetailUserPage />} />
          </Route>
        </Route> */}
      </Route>
      {/* <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<div />} /> */}
    </Routes>
  );
};

export default RouterLayout;
