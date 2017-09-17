// import {bindAllMethods} from './util';
import reduxify from "../util/reduxify";
import { setLanguage } from "../actions/language";
import React, { Component } from "react";
import pick from "lodash/pick";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import HamburgerIcon from "material-ui/svg-icons/navigation/menu";
import LanguageIcon from "material-ui/svg-icons/action/language";
import RaisedButton from "material-ui/RaisedButton";

import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import palette from "../constants/palette";
import { Tab } from "material-ui/Tabs";
import { StyleSheet, css } from "aphrodite";
import labels from "../text/labels";
import { Link } from "react-router-dom";

const styles = StyleSheet.create({
  buttonStyle: {
    marginLeft: "0.5vw",
    marginRight: "0.5vw"
  },
  hideMobile: {
    "@media (max-width: 850px)": {
      display: "none"
    },
    "@media (max-device-width: 800px)": {
      display: "none"
    }
  },
  showSmall: {
    "@media (max-device-width: 800px)": {
      display: "none"
    }
  },
  showMobile: {
    display: "none",
    "@media (max-device-width: 800px)": {
      display: "inline-block"
    }
  },
  toolbar: {
    backgroundColor: palette.iceFlagBlue,
    height: "56px",
    "@media (max-device-width: 800px)": {
      height: "100px"
    }
  },
  hamburgerMenu: {
    marginLeft: "0.5vw",
    marginRight: "0.5vw",
    marginTop: "0.5vh"
  },
  menuIconButton: {
    height: "48px",
    width: "48px",
    padding: "4px",
    "@media (max-device-width: 800px)": {
      height: "80px",
      width: "80px"
    }
  },
  menuIcon: {
    height: "100%",
    width: "100%"
  },
  menuLanguageText: {
    fontFamily: "Roboto",
    color: palette.white
  },
  flags: {
    height: "20px",
    width: "35px",
    "@media (max-device-width: 800px)": {
      height: "40px",
      width: "70px"
    }
  },
  menuText: {
    display: "flex",
    alignItems: "center",
    "@media (max-device-width: 800px)": {
      fontSize: "35px",
      lineHeight: "35px",
      height: "60px"
    }
  }
});

const icelandFlagSVG = "../../img/icelandFlag.svg";
const englishFlagSVG = "../../img/englishFlag.svg";

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.languageDivProps = pick(props, ["language"]);
    this.state = {
      value: 3
    };
  }

  handleLanguageChange(event, value) {
    console.log(value, { event }, { value });
    this.props.actions.setLanguage(value);
  }

  render() {
    return (
      <div>
        <Toolbar className={css(styles.toolbar)}>
          <ToolbarGroup firstChild={true}>
            <IconMenu
              className={css(styles.hamburgerMenu)}
              onChange={this.handlePageSelect}
              iconButtonElement={
                <IconButton className={css(styles.menuIconButton)}>
                  <HamburgerIcon
                    className={css(styles.menuIcon)}
                    color="white"
                  />
                </IconButton>
              }
              targetOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "top" }}
            >
              <Link to="/">
                <MenuItem
                  primaryText={labels.home[this.props.language]}
                  className={css(styles.menuText)}
                  value="/"
                />
              </Link>
              <Link to="/learn">
                <MenuItem
                  primaryText={labels.learn[this.props.language]}
                  className={css(styles.menuText)}
                  value="/learn"
                />
              </Link>
              <Link to="/about">
                <MenuItem
                  primaryText={labels.about[this.props.language]}
                  className={css(styles.menuText)}
                  value="/about"
                />{" "}
              </Link>

              <Link to="/constitution">
                <MenuItem
                  primaryText={labels.theConstitution[this.props.language]}
                  className={css(styles.menuText)}
                  value="/constitution"
                />{" "}
              </Link>

              <Link to="/parties">
                <MenuItem
                  primaryText={labels.parties[this.props.language]}
                  className={css(styles.menuText)}
                  value="/parties"
                />{" "}
              </Link>
            </IconMenu>
            {/*Shown only on desktop. */}
            <Link to="/">
              <RaisedButton
                className={css(styles.buttonStyle, styles.hideMobile)}
                backgroundColor={palette.white}
                labelStyle={{
                  fontWeight: "900",
                  fontFamily: "Roboto Condensed"
                }}
                label={labels.home[this.props.language]}
              />{" "}
            </Link>

            <Link to="/learn">
              <RaisedButton
                className={css(styles.buttonStyle, styles.hideMobile)}
                backgroundColor={palette.white}
                labelStyle={{
                  fontWeight: "900",
                  fontFamily: "Roboto Condensed"
                }}
                label={labels.learn[this.props.language]}
              />{" "}
            </Link>

            <Link to="/about">
              <RaisedButton
                className={css(styles.buttonStyle, styles.hideMobile)}
                backgroundColor={palette.white}
                labelStyle={{
                  fontWeight: "900",
                  fontFamily: "Roboto Condensed"
                }}
                label={labels.about[this.props.language]}
              />{" "}
            </Link>

            <Link to="/constitution">
              <RaisedButton
                className={css(styles.buttonStyle, styles.hideMobile)}
                backgroundColor={palette.white}
                labelStyle={{
                  fontWeight: "900",
                  fontFamily: "Roboto Condensed"
                }}
                label={labels.theConstitution[this.props.language]}
              />{" "}
            </Link>
            <Link to="/parties">
              <RaisedButton
                className={css(styles.buttonStyle, styles.hideMobile)}
                backgroundColor={palette.white}
                labelStyle={{
                  fontWeight: "900",
                  fontFamily: "Roboto Condensed"
                }}
                label={labels.parties[this.props.language]}
              />{" "}
            </Link>
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
            <IconMenu
              style={{
                marginLeft: "0.5vw",
                marginRight: "0.5vw",
                marginTop: "0.5vh"
              }}
              onChange={this.handleLanguageChange}
              iconButtonElement={
                <div className={css(styles.menuText)}>
                  <img
                    className={css(styles.flags)}
                    style={{ marginRight: "1vw" }}
                    src={
                      this.props.language === "IS"
                        ? icelandFlagSVG
                        : englishFlagSVG
                    }
                  />
                  <span className={css(styles.menuLanguageText)}>
                    {this.props.language}
                  </span>
                  <IconButton className={css(styles.menuIconButton)}>
                    <LanguageIcon
                      className={css(styles.menuIcon)}
                      color="white"
                    />
                  </IconButton>
                </div>
              }
              targetOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "top" }}
            >
              <MenuItem
                primaryText={
                  <span className={css(styles.menuText)}>
                    <img
                      className={css(styles.flags)}
                      src={icelandFlagSVG}
                    />&nbsp;&nbsp;Íslenska
                  </span>
                }
                value="IS"
              />
              <MenuItem
                primaryText={
                  <span className={css(styles.menuText)}>
                    <img
                      className={css(styles.flags)}
                      src={englishFlagSVG}
                    />&nbsp;&nbsp;English
                  </span>
                }
                value="EN"
              />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

export default reduxify({ setLanguage }, ["language"], Header);
