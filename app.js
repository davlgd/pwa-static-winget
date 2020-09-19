const wingetUrl = "https://api.github.com/repos/microsoft/winget-pkgs/contents/manifests"

// On récupère la liste des paquets, on affiche une erreur en cas de problème
fetch(wingetUrl)
.then(response => response.json())
.then(jsonPkgs => showPkgs(jsonPkgs))
.catch((error) => console.log("Erreur pendant la récuparation du JSON des paquets winget : ", error))

// On affiche la liste des paquets dans la zone pkgsList
let showPkgs = (data) => {
    let zone = document.getElementById("pkgsList")    
    let list = document.createElement("ol")

    // Pour chaque élément du fichier JSON on créé une puce avec un lien
    data.forEach(app => {
        
        let link = document.createElement("a")
        link.href = app.html_url
        link.target = "_blank"
        link.rel = "noopener"
        link.innerText = app.name

        let puce = document.createElement("li")
        
        puce.appendChild(link)
        list.appendChild(puce)
    });

    // On affiche le nombre d'éléments et la liste à puces
    zone.innerText = `Le dépôt de winget compte ${data.length} entrées : `
    zone.appendChild(list)

    document.title = `Paquets winget (${data.length})`
}