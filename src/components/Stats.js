import React, { Component } from "react";
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";
import img from "../assets/images/UB-woodblock-closeup.jpg";
import "../assets/css/stats.css";

class Stats extends Component {
  render() {
    let statList;
    const { stats, t } = this.props;

    if (Object.entries(stats).length === 0 && stats.constructor === Object) {
      statList = <div className="blinky">{t("technical.loading")}</div>;
    } else {
      statList = (
        <ul className="list-stats">
          <li className="stat-item">
            <p>
              {t("stats.LastUpdate")}: <em>{stats.LastUpdate}</em>
            </p>
          </li>
          <li className="stat-item">
            <p>
              {t("stats.PagesDigitized")}: <em>{stats.PagesDigitized}</em>
            </p>
          </li>
          <li className="stat-item">
            <p>
              {t("stats.VolumesDigitized")}: <em>{stats.VolumesDigitized}</em>
            </p>
          </li>
          <li className="stat-item">
            <p>
              {t("stats.VolumesCataloged")}:{" "}
              <em>{stats["VolumesCataloged(normalized)"]}</em>
            </p>
          </li>
          <li className="stat-item">
            <p>
              {t("stats.TitlesCataloged")}:{" "}
              <em>{stats["TitlesCataloged(ACIP)"]}</em>
            </p>
          </li>
        </ul>
      );
    }

    return (
      <section className="wrapper special style3">
        <div className="inner">
          <section className="spotlights">
            <section>
              <h2>{t("stats.Title")}</h2>
              {statList}
            </section>
            <section>
              <span className="image">
                <img src={img} alt="" />
              </span>
            </section>
          </section>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  stats: state.gsData.isFetching ? {} : state.gsData.gs
});

const withN = new withNamespaces()(Stats);
export default connect(mapStateToProps)(withN);
