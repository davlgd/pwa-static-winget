const wingetUrl = "https://api.github.com/repos/microsoft/winget-pkgs/contents/manifests"

let length = 0;
let list = document.createElement("ol")
let frag = document.createDocumentFragment()
let zone = document.getElementById("pkgsList")

// On récupère la liste des URL à traiter, on affiche une erreur en cas de problème
fetch(wingetUrl)
.then(response => response.json())
.then(list => list.forEach(element => {
    // Pour chaque URL, on récupère les données
    fetch(element.url)
        .then(data => data.json())
        .then(jsonPkgs => showPkgs(jsonPkgs))
}))
// En cas de problème on affiche l'erreur dans la console et un message sur la page
.catch((error) => {
    console.log("Erreur pendant la liste des URL à traiter : ", error)
    zone.innerText = "Une erreur est survenue pendant la récupération des données"
})

let showPkgs = (pkgs) => {

    // Pour chaque élément du fichier JSON on créé une puce avec un lien
    // On stocke le tout dans un fragment dans un premier temps
    pkgs.forEach(app => {
        let link = document.createElement("a")
        link.href = app.html_url
        link.target = "_blank"
        link.rel = "noopener"
        link.innerText = app.name

        let puce = document.createElement("li")

        puce.appendChild(link)
        frag.appendChild(puce)
    });

    // On incrémente et affiche le nombre d'éléments
    length += pkgs.length
    zone.innerText = `Le dépôt de winget compte ${length} entrées : `
    document.title = `Paquets winget (${length})`

    // On ajoute chaque élément à la liste à puce via le fragment
    list.appendChild(frag)
    zone.appendChild(list)
}
