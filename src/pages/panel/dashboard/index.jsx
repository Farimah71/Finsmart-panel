import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmbedReport } from "../../../redux/actions/settings/embed-report";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import { getDataFromJwtToken } from "../../../helpers/get-data-from-jwt";
import { Spinner } from "../../../components";

export const Dashboard = () => {
  // ---------- store ----------
  const { loading } = useSelector((state) => state.loadingSlice);
  const { info: embedReport, loading: embedLoading } = useSelector(
    (state) => state.embedReportSlice
  );

  // ---------- hook ----------
  const dispatch = useDispatch();

  // ---------- variable ----------
  const isCompany = getDataFromJwtToken("CompanyId");

  // ---------- lifecycle ----------
  useLayoutEffect(() => {
    dispatch(getEmbedReport());
  }, [isCompany]);

  // ---------- render jsx ----------
  if (embedLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  if (!embedLoading) {
    if (isCompany !== undefined) {
      if (Object.keys(embedReport) && embedReport.embedReports) {
        return (
          <div className="w-full h-full">
            <PowerBIEmbed
              embedConfig={{
                type: "report",
                id: embedReport?.embedReports[0].reportId,
                dashboardId: "5d1b4392-68a8-4a16-908c-40a59f965dc4",
                embedUrl: embedReport?.embedReports[0].embedUrl,
                accessToken: embedReport?.embedToken.token,
                tokenType: models.TokenType.Embed,
                settings: {
                  panes: {
                    filters: {
                      expanded: false,
                      visible: false,
                    },
                  },
                  background: models.BackgroundType.Transparent,
                  layoutType: models.LayoutType.Custom,
                  customLayout: {
                    displayOption: models.DisplayOption.FitToWidth,
                  },
                },
              }}
              eventHandlers={
                new Map([
                  // [
                  //   "loaded",
                  //   function () {
                  //     console.log("Report loaded");
                  //   },
                  // ],
                  // [
                  //   "rendered",
                  //   function () {
                  //     console.log("Report rendered");
                  //   },
                  // ],
                  // [
                  //   "error",
                  //   function (event) {
                  //     console.log(event.detail);
                  //   },
                  // ],
                  // ["visualClicked", () => console.log("visual clicked")],
                  // ["pageChanged", (event) => console.log(event)],
                ])
              }
              cssClassName={"w-full h-full bg-white"}
              getEmbeddedComponent={(embeddedReport) => {
                window.Report = embeddedReport;
              }}
            />
          </div>
        );
      } else if (loading) {
        <Spinner />;
      }
    }
  }
};
