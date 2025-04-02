const form = document.getElementById("formRazzo")
const rocketName = document.getElementById("rocketName")
const rocketimage = document.getElementById("rocketimage")
const rocketCompany = document.getElementById("rocketCompany")
const rocketHeight = document.getElementById("rocketHeight")
const rocketDiameter = document.getElementById("rocketDiameter")
const rocketMass = document.getElementById("rocketMass")
const rocketNumStages = document.getElementById("rocketNumStages")
const rocketFirstStage = document.getElementById("rocketFirstStage")
const rocketFirstStageEngine = document.getElementById("rocketFirstStageEngine")
const rocketSecondStage = document.getElementById("rocketSecondStage")
const rocketSecondStageEngine = document.getElementById("rocketSecondStageEngine")
const rocketThirdStage = document.getElementById("rocketThirdStage")
const rockrocketThirdStageEngineetCompany = document.getElementById("rocketThirdStageEngine")
const renderApi = document.getElementById("renderApi")

//variabili Modale
const formModale = document.getElementById("formRazzoModale")
const rocketNameModale = document.getElementById("rocketNameModale")
const rocketimageModale = document.getElementById("rocketimageModale")
const rocketCompanyModale = document.getElementById("rocketCompanyModale")
const rocketHeightModale = document.getElementById("rocketHeightModale")
const rocketDiameterModale = document.getElementById("rocketDiameterModale")
const rocketMassModale = document.getElementById("rocketMassModale")
const rocketNumStagesModale = document.getElementById("rocketNumStagesModale")
const rocketFirstStageModale = document.getElementById("rocketFirstStageModale")
const rocketFirstStageEngineModale = document.getElementById("rocketFirstStageEngineModale")
const rocketSecondStageModale = document.getElementById("rocketSecondStageModale")
const rocketSecondStageEngineModale = document.getElementById("rocketSecondStageEngineModale")
const rocketThirdStageModale = document.getElementById("rocketThirdStageModale")
const rockrocketThirdStageEngineetCompanyModale = document.getElementById("rocketThirdStageEngineModale")

const urlRockets = "http://localhost:5010/rockets"

document.addEventListener("DOMContentLoaded", fetchRockets);

// Fetch upload
async function uploadImage(file) {
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch("http://localhost:5010/upload", {
        method: "POST",
        body: formData,
    });
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return await response.json();
}

//fetch razzi
async function fetchRockets() {
    const response = await fetch(urlRockets);
    const rockets = await response.json();
    fetchRockets(rockets);
}

//creazione del razzo