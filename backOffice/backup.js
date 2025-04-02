const form = document.querySelector("form");
const inpCompanyName = document.getElementById("companyName");
const inpCompanyLogo = document.getElementById("companyLogo");
const inpCompanyHeadquarters = document.getElementById("companyHeadquarters");
const inpCompanyWebsite = document.getElementById("companyWebsite");
const renderApi = document.getElementById("renderApi");

const urlCompanies = "http://localhost:5010/companies"


document.addEventListener("DOMContentLoaded", fetchCompanies);
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
// Fetch aziende
async function fetchCompanies() {
  const response = await fetch("http://localhost:5010/companies");
  const companies = await response.json();
  renderCompanies(companies);
}
// Creazione dell' azienda tramitte form
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const companyName = inpCompanyName.value.trim();
  const companyLogo = inpCompanyLogo.files[0];
  const companyHeadquarters = inpCompanyHeadquarters.value.trim();
  const companyWebsite = inpCompanyWebsite.value.trim();

  if (!companyName) {
    alert("Compila il campo nome");
    return;
  }

  if (!companyLogo) {
    alert("Inserisci il logo dell'azienda");
    return;
  }

  if (!companyHeadquarters) {
    alert("Inserisci la sede dell'azienda");
    return;
  }

  if (!companyWebsite) {
    alert("Inserisci il sito dell'azienda");
    return;
  }

  try {
    const imageData = await uploadImage(companyLogo);

    const payload = {
      name: companyName,
      logo: imageData.url,
      headquarters: companyHeadquarters,
      website: companyWebsite,
    };

    const response = await fetch("http://localhost:5010/companies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Errore HTTP: ${response.status} - ${errorData.error}`);
    }

    inpCompanyName.value = "";
    inpCompanyLogo.value = "";
    inpCompanyHeadquarters.value = "";
    inpCompanyWebsite.value = "";

    fetchCompanies();
  } catch (error) {
    console.error(error);
  }
});

function renderCompanies(companies) {
  renderApi.innerHTML = ""; 
  companies.forEach((company) => {
    const cardCompany = document.createElement("div");
    cardCompany.classList.add("card-backoffice");
    cardCompany.innerHTML = `
        <p>Nome: <strong>${company.name}</strong></p>
        <img src="${company.logo}" alt="${company.name}" width="100">
        <p>Sede: <strong>${company.headquarters}</strong></p>
        <p>Sito: <strong>${company.website}</strong></p>
        <div class="container-btn-card-backoffice">
            <button class="btn-backoffice btn-modifica" data-id="${company._id}">Modifica</button>
            <button class="btn-backoffice btn-elimina" data-id="${company._id}">Elimina</button>
        </div>
    `;
    renderApi.appendChild(cardCompany);
  });
  eventiBtn();
}

//Funzione per prendere gli eventi modifica ed elimina
function eventiBtn() {
  document.querySelectorAll(".btn-modifica").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      console.log("MODIFICA:", id);
      
    });
  });

  document.querySelectorAll(".btn-elimina").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      console.log("ELIMINA:", id);
    });
  });
}

// funzione elimina
async function deleteCompany(id) {
  try {
      const response = await fetch(urlCompanies + "/" + id, {
          method: "DELETE",
      })
      if (!response.ok) {
          const errorData = await response.json()
          throw new Error("ERRORE: ${response.status} - ${errorData.error}")
      }
      fetchCompanies();
  } catch (error) {
      console.error("Errore nell'eliminzazione: " + error)
  }
}
