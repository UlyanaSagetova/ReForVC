const constellationsData = [
    {
        id: "ursa-major",
        name: "Большая медведица",
        season: "spring",
        ra: 165.0,
        dec: 55.0,
        myth: "Согласно древнегреческому мифу, прекрасная нимфа Каллисто была возлюбленной Зевса. Ревнивая Гера превратила девушку в огромную медведицу. Спустя годы её сын Аркас, став охотником, едва не убил мать в лесу. Чтобы предотвратить трагедию, Зевс вознёс обоих на небо: Каллисто стала Большой Медведицей, а Аркас — Малой Медведицей. Ковш Большой Медведицы является главным ориентиром для поиска Полярной звезды."
    },
    {
        id: "cassiopeia",
        name: "Кассиопея",
        season: "autumn",
        ra: 15.0,
        dec: 60.0,
        myth: "Кассиопея была царицей Эфиопии и женой царя Цефея. Она славилась своей красотой, но погубила себя гордыней, заявив, что она и её дочь Андромеда прекраснее морских нимф — нереид. За это Посейдон наслал на страну чудовище, а саму Кассиопею после смерти поместил на небо в виде созвездия, напоминающего букву «М» или «W», привязанной к трону так, что половину суток она вращается вверх ногами."
    },
    {
        id: "ursa-minor",
        name: "Малая медведица",
        season: "summer",
        ra: 225.0,
        dec: 75.0,
        myth: "Малая Медведица тесно связана с легендой о Каллисто. По одной из версий мифа, это её сын Аркас, вознесённый Зевсом на небосклон. По другой версии — это критская нимфа Киносура, выкормившая младенца Зевса в пещере на горе Ида. В благодарность громовержец поместил её на самый север небосвода, а кончик хвоста Малой Медведицы венчает Полярная звезда, веками указывающая путь мореплавателям."
    },
    {
        id: "orion",
        name: "Орион",
        season: "winter",
        ra: 83.8,
        dec: -5.4,
        myth: "Орион был великаном и искусным охотником, сыном бога морей Посейдона. Он хвастался, что способен одолеть любого зверя на Земле. Разгневанная богиня Земли Гея (или богиня охоты Артемида) наслала на него гигантского Скорпиона, чей укус оказался смертельным. Зевс поместил Ориона среди звёзд, но так, чтобы он никогда не встречался со Скорпином: когда Скорпион восходит на востоке, Орион скрывается за горизонтом на западе."
    },
    {
        id: "perseus",
        name: "Персей",
        season: "summer",
        ra: 46.0,
        dec: 45.0,
        myth: "Согласно мифам, Андромеда — дочь Цефея и Кассиопеи. Разгневанные гордыней царицы морские нимфы попросили Посейдона наказать девушку, и тот послал к берегам Эфиопии морского монстра. Остановить его могла лишь жертва — сама Андромеда, прикованная к скале. В самый последний момент её спас герой Персей, возвращавшийся после победы над горгоной Медузой. Вскоре Андромеда и Персей поженились, а созвездие Персея до сих пор соседствует с Андромедой."
    }
];

const directConstellationLines = [
    ["UMa", 165.0, 56.0, 67301, 65378, 65378, 62956, 62956, 59774, 59774, 58001, 58001, 53910, 53910, 54061, 54061, 59774],
    ["Cas", 15.0, 60.0, 746, 3179, 3179, 4427, 4427, 6686, 6686, 8886],
    ["UMi", 225.0, 76.0, 11767, 85822, 85822, 82080, 82080, 77055, 77055, 72607, 72607, 75097, 75097, 79822, 79822, 77055],
    ["Ori", 83.8, -5.4, 27989, 25336, 25336, 25930, 25930, 24436, 24436, 27366, 27366, 26727, 26727, 27989, 25930, 26311, 26311, 26727],
    ["Per", 46.0, 45.0, 15863, 14328, 14328, 13268, 15863, 17358, 17358, 18532, 18532, 18246, 15863, 14576, 14576, 14354]
];

let planetarium = null;
let currentSeason = "summer";
let activeConstellationId = "perseus";

document.addEventListener("DOMContentLoaded", function () {
    if (typeof window.S !== "undefined" && typeof window.S.virtualsky === "function") {
        planetarium = window.S.virtualsky({
            id: "starmap",
            base: "https://github.io",
            projection: "gnomic",
            ra: 46.0,
            dec: 45.0,
            fov: 55,                          
            constellations: true,             
            lines: directConstellationLines,  
            constellationlabels: false,
            constellationwidth: 2.2,          
            showstars: true,
            scalestars: 1.5,                 
            showdate: true,
            showposition: true,
            gradient: true,
            ground: false
        });
    }

    renderConstellationList();
    selectConstellation(activeConstellationId, false);

    // Переключение сезонов
    document.querySelectorAll(".season-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            document.querySelectorAll(".season-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentSeason = btn.getAttribute("data-season");
            renderConstellationList();
        });
    });

    // Кнопка "Читать далее"
    const readMoreBtn = document.getElementById("readMoreBtn");
    const mythText = document.getElementById("mythText");
    if (readMoreBtn && mythText) {
        readMoreBtn.addEventListener("click", function () {
            const isCollapsed = mythText.classList.toggle("collapsed");
            readMoreBtn.querySelector("span:first-child").textContent = isCollapsed ? "Читать далее" : "Свернуть";
        });
    }
});

function renderConstellationList() {
    const listEl = document.getElementById("constellationList");
    if (!listEl) return;
    listEl.innerHTML = "";

    constellationsData.forEach(function (item) {
        const li = document.createElement("li");
        li.className = "star-item" + (item.id === activeConstellationId ? " active" : "");
        li.textContent = item.name + (item.season === currentSeason ? " ✦" : "");

        li.addEventListener("click", function () {
            selectConstellation(item.id, true);
        });
        listEl.appendChild(li);
    });
}

function selectConstellation(id, animate) {
    const data = constellationsData.find(c => c.id === id);
    if (!data) return;

    activeConstellationId = id;
    renderConstellationList();

    document.getElementById("mythTitle").textContent = data.name;
    const textEl = document.getElementById("mythText");
    textEl.textContent = data.myth;
    textEl.classList.add("collapsed");
    document.querySelector("#readMoreBtn span:first-child").textContent = "Читать далее";

    if (planetarium) {
        // Ставим яркий маркер с названием прямо на выбранное созвездие, чтобы было сразу понятно, кто где!
        planetarium.pointers = [];
        if (typeof planetarium.addPointer === "function") {
            planetarium.addPointer({
                ra: data.ra,
                dec: data.dec,
                label: data.name,
                colour: "#7dd3fc",
                html: `<div style="color:#03080e; font-size:12px; padding:4px;"><b>${data.name}</b></div>`
            });
        }

        if (animate && typeof planetarium.panTo === "function") {
            planetarium.panTo(data.ra, data.dec, 1000);
        } else {
            planetarium.setRADec(data.ra, data.dec).draw();
        }
    }
}
