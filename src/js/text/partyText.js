const logodir = "../../img/partyLogos/";
const bfLogo = logodir + "bf.png";
const lgLogo = logodir + "lg.png";
const ppLogo = logodir + "pp.png";
const xsLogo = logodir + "xs.png";
const inLogo = logodir + "in.png";
const prLogo = logodir + "pr.svg";
const doLogo = logodir + "do.jpg";
const hfLogo = logodir + "hf.png";
const ipLogo = logodir + "ip.jpg";
const viLogo = logodir + "vi.png";
const alLogo = logodir + "al.png";
const flLogo = logodir + "fl.jpg";

export default {
  statement: {
    EN:
      '"We commit to making constitutional reform, based on the draft of the Constitutional Council, a priority at the next parliament."',
    IS:
      '"Við skuldbindum okkur hér með til þess að gera stjórnarskrárumbætur, sem grundvallast á drögum stjórnlagaráðs, að forgangsmáli á nýju þingi."'
  },
  order: [
    "pp",
    "lg",
    "bf",
    "xs",
    "do",
    "in",
    "pr",
    "al",
    "ip",
    "vi",
    "hf",
    "fl"
  ],
  data: {
    pp: {
      EN: "Pirate Party",
      IS: "Píratar",
      support: "YEA",
      logo: ppLogo
    },
    xs: {
      EN: "Social Democratic Alliance",
      IS: "Samfylkingin",
      support: "YEA",
      logo: xsLogo
    },
    lg: {
      EN: "Left-Green Movement",
      IS: "Vinstrihreyfingin - grænt framboð",
      support: "YEA",
      logo: lgLogo
    },
    bf: {
      EN: "Bright Future",
      IS: "Björt framtíð",
      support: "YEA",
      logo: bfLogo
    },
    pr: {
      EN: "Progressive Party",
      IS: "Framsóknarflokkurinn",
      support: "MEH",
      logo: prLogo
    },
    in: {
      EN: "Independence Party",
      IS: "Sjálfstæðisflokkurinn",
      support: "NAY",
      logo: inLogo
    },
    al: {
      EN: "People's Front",
      IS: "Alþýðufylkingin",
      support: "NAY",
      logo: alLogo
    },
    do: {
      EN: "Dawn",
      IS: "Dögun",
      support: "YEA",
      logo: doLogo
    },
    ip: {
      EN: "Icelandic National Front",
      IS: "Íslenska þjóðfylkingin",
      support: "MEH",
      logo: ipLogo
    },
    vi: {
      EN: "Revival",
      IS: "Viðreisn",
      support: "MEH",
      logo: viLogo
    },
    hf: {
      EN: "Humanist Party",
      IS: "Húmanistaflokkurinn",
      support: "YEA",
      logo: hfLogo
    },
    fl: {
      EN: "People's Party",
      IS: "Flokkur fólksins",
      support: "MEH",
      logo: flLogo
    }
  }
};
