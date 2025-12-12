/* ============================
   Shanpu Touch Screen Knob SFC
   Main Control Script
============================ */

let angle = 0;
let currentScene = "car";
let value = 23;

const ring = document.getElementById("ring");
const valueBox = document.getElementById("value");
const iconBox = document.getElementById("icon");
const bg = document.getElementById("scene-bg");

const sceneButtons = document.querySelectorAll("#scene-buttons button");

/* ------------------------------
   初始背景（Car）
------------------------------ */
bg.style.background = "linear-gradient(135deg,#2b2b2b,#111)";


/* ------------------------------
   手勢旋轉邏輯（iPhone / iPad）
------------------------------ */

let lastY = null;

document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];

    if (lastY === null) {
        lastY = touch.clientY;
        return;
    }

    const deltaY = lastY - touch.clientY;

    angle += deltaY * 0.7; // 調整靈敏度
    ring.style.transform = `rotate(${angle}deg)`;

    updateValue(deltaY);

    lastY = touch.clientY;
});

document.addEventListener("touchend", () => {
    lastY = null;
});


/* ------------------------------
   根據場景更新數值
------------------------------ */
function updateValue(delta) {

    if (currentScene === "car") {

        value = Math.min(30, Math.max(16, value + delta * 0.05));
        valueBox.textContent = Math.round(value) + "°C";

        iconBox.textContent = value < 23 ? "❄️" : "🔥";

        const blue = Math.max(0, 255 - (value - 16) * 14);
        const red = Math.max(0, 255 - (30 - value) * 14);

        bg.style.background = `radial-gradient(circle,
            rgb(${red},${100},${blue}),
            #000
        )`;

    }

    else if (currentScene === "home") {

        value = Math.min(100, Math.max(0, value + delta * 0.15));
        valueBox.textContent = Math.round(value) + "%";

        iconBox.textContent = "💡";

        const brightness = value / 100;
        bg.style.filter = `brightness(${0.6 + brightness * 0.7})`;
    }

    else if (currentScene === "fan") {

        value = Math.min(5, Math.max(1, value + delta * 0.02));
        valueBox.textContent = Math.round(value);

        iconBox.textContent = "🌀";

        const intensity = 0.3 + (value - 1) * 0.15;
        bg.style.background = `radial-gradient(circle,
            rgba(0,150,255,${intensity}),
            #000
        )`;
    }
}


/* ------------------------------
   三場景切換按鈕
------------------------------ */

sceneButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        sceneButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        currentScene = btn.dataset.scene;

        if (currentScene === "car") {
            value = 23;
            iconBox.textContent = "❄️";
            valueBox.textContent = "23°C";
            bg.style.background = "linear-gradient(135deg,#2a4,#000)";
        }

        if (currentScene === "home") {
            value = 50;
            iconBox.textContent = "💡";
            valueBox.textContent = "50%";
            bg.style.background = "linear-gradient(135deg,#444,#111)";
        }

        if (currentScene === "fan") {
            value = 2;
            iconBox.textContent = "🌀";
            valueBox.textContent = "2";
            bg.style.background = "linear-gradient(135deg,#004,#000)";
        }
    });
});
