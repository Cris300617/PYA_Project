const sizes = {
    mobile: "0px",
    tablet: "768px",
    laptop: "992px",
    desktop: "1025px",
};

export const Device ={
    mobile: `(min-width: ${sizes.mobile})`,
    tablet: `(min-width: ${sizes.tablet})`,
    laptop: `(min-width: ${sizes.laptop})`,
    desktop: `(min-width: ${sizes.desktop})`,
};