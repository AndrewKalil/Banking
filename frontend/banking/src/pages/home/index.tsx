import React, { FC, useCallback, useEffect } from "react";
import { Query } from "../../core/models/query.model";
import { getAccounts } from "../../data/features/account/accountSlice";
import { useAppDispatch, useAppSelector } from "../../data/store";
import "./style.scss";
import HomeBg from "./svgs/home_background";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const dispatch = useAppDispatch();
  const accountSelector = useAppSelector((state) => state.accounts);

  // Get initial accounts data
  const initApp = useCallback(async () => {
    await dispatch(getAccounts({} as Query));
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  return (
    <div className="flex flex-col justify-center items-center gap-3 h-full w-full">
      <div className="w-4/5 h-80">
        <HomeBg />
      </div>
      <h1>
        BALANCE:{" "}
        <span className="text-green-500">
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "COP",
          }).format(accountSelector.totalBalance)}
        </span>
      </h1>
    </div>
  );
};

export default Home;
