# 💥Search-Zoom to address via Mapbox API
## Web application which lets you geocode address and zoom in with the help of mapbox API.
This application is developed to let users geocode address and zoom into that location. In this application tries to replicate google maps search functionality. We use Openlayers V6, an open-source JavaScript library for mapping. 

The associated blog post can be found ![here](https://amanbagrecha.github.io/post/openlayers/geocode-using-mapbox-api-with-zoom-functionality/)
## 🛠️ Usage

That's pretty easy. The application is hosted on github pages which can be accessed :link: [here](https://amanbagrecha.github.io/mapbox-search-functionality/)

<details><summary>Open the application and click on <code>EXPLORE</code></summary>

![img](https://i.imgur.com/DMp4Olm.png)
</details>

<details><summary>Enter the address in the search bar and click on SUBMIT QUERY</summary>

![img](https://i.imgur.com/jCeV6NF.jpg)
</details>

<details><summary>If you want to go back click on the <code>Home</code> button on the ribbon</summary>
  
![img](https://i.imgur.com/Lx4md7X.jpg)
</details>

[comment]: <> (index.html is the home page, map.html is the second page. )

[comment]: <> (In assets, leaflet.js and map.css are file which should be altered for mapping changes. )

---
## 🔀 Local Installation
To use the application on your local machine, simply follow the steps mentioned below.

1. Fork the repository

![fork_button](https://docs.github.com/assets/images/help/repository/fork_button.jpg)

2. Clone the Repo by going to your local Git Client and pushing in the command:

```sh
git clone https://github.com/amanbagrecha/mapbox-search-functionality.git
```
3. 🔑 Edit `MAPBOX_API_KEY`: The search funtionality would only work after editing the `MAPBOX_API_KEY` in `map.js`. 

4. Run the application by pushing in the command:

```sh
start index.html
```



## 🏁 Technology Stack

* [Openlayers](https://github.com/openlayers/openlayers)
* [HTML](https://www.w3.org/TR/html52/)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Bootstrap](https://getbootstrap.com/)
* [Mapbox](https://github.com/mapbox/mapbox-gl-geocoder)

## 📋 Further modification that can be done.
- [ ] Store API key in backend using firebase.
- [ ] Load layers from geoserver
- [ ] Allow for selection of feature on the layer 
