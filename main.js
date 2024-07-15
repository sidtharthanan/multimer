
const trigger = function () {
    const schedule = document.getElementById("schedule");
    const value = (schedule.value || "").trim();
    const timeLens = value.split(/\s*\,\s*/)
        .map((mins) => 60 * +mins);
    let lastStop = 0;
    timeLens.forEach((timeLen) => {
        setTimeout(() => timer(timeLen), lastStop * 1000);
        lastStop += timeLen;
    });
}

const getTimeStr = function (seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds - h * 3600 - m * 60));
    const hh = ("" + h).padStart(2, "0");
    const mm = ("" + m).padStart(2, "0");
    const ss = ("" + s).padStart(2, "0");
    return hh + ":" + mm + ":" + ss;
}

const timer = function (seconds) {
    let temp = seconds;
    const intFn = () => {
        document.getElementById("timestamp").innerHTML = getTimeStr(temp);
        document.getElementById("progress-bar").style.width = (temp * 100) / (seconds) + "%";

        if (temp <= 0) {
            document.getElementById("alarm").play();
            clearInterval(intervalId);
        }
    }

    const intervalId = setInterval(() => {
        temp--;
        intFn();
    }, 1000);
    intFn();

}
