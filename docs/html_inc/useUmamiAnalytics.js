// Umami Analytics does not use cookies. We also do not collect PII. No explicit consent is required.

// Activate analytics collection:
(function () {
    const host = window.location.hostname;
    const isLocalhost =
        host === "localhost" ||
        host === "localhost." ||
        host.endsWith(".localhost") ||
        host === "::1" ||
        host === "0.0.0.0" ||
        host === "127.0.0.1" ||
        host.indexOf("127.") === 0 ||
        host.indexOf("::ffff:127.") === 0;

    const protocol = window.location.protocol;
    const isFile = protocol === "file:";

    const tagVal = isFile ? "LocalFile" : isLocalhost ? "Localhost" : host;
    const tagStr = "page-host-" + tagVal;

    var umamiScript = document.createElement("script");
    umamiScript.defer = true;
    umamiScript.src = "https://cloud.umami.is/script.js";
    umamiScript.setAttribute("data-website-id", "d07b4136-3660-4dc1-97ae-1c86beafb5d2");
    umamiScript.setAttribute("data-tag", tagStr);

    (document.head || document.body || document.documentElement).appendChild(umamiScript);
})();

// Track all clicked links, including links to images and to external items:
document.addEventListener("click", function (e) {
    const clickedAElement = e.target.closest("a");
    if (!clickedAElement) {
        return;
    }

    if (!window.umami || typeof window.umami.track !== "function") {
        console.error("Link was clicked, but will not be tracked, because Umami tracking is not initialized.");
        return;
    }

    const removePrefix = (str, pref, replace) => {
        if (typeof str !== "string") return str;
        if (typeof pref !== "string") return str;
        if (!replace) replace = "";
        return str.startsWith(pref) ? replace + str.slice(pref.length) : str;
    };

    const hrefAttr = clickedAElement.getAttribute("href") || "href-not-set";
    var hrefAddr = hrefAttr;
    hrefAddr = removePrefix(hrefAddr, "https://github.com/macrogreg/Combined-Income-Tax-Estimator/", "GitHub-Repo/");
    hrefAddr = removePrefix(hrefAddr, "https://1drv.ms/", "OneDrive/");
    hrefAddr = removePrefix(hrefAddr, "https://");
    hrefAddr = removePrefix(hrefAddr, "http://");

    umami.track("Link Clicked", {
        href: hrefAddr,
    });
});
