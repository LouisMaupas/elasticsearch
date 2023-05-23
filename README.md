## fichier csv

les data

## ElasticSearch

ElasticSearch index les données du fichier CSV

### Pull et run l'image

### reactiver X-Pack Security en l'absence d'éditeur de texte

`docker cp 5aea6d431cbeae74612492c3c3087d4a22fc29d1b3dfe5a7a0dc1b7295e797a6:/usr/share/elasticsearch/config/elasticsearch.yml elasticsearch.yml
`

ajouter
`xpack.security.enabled: true`

`docker cp elasticsearch.yml 5aea6d431cbeae74612492c3c3087d4a22fc29d1b3dfe5a7a0dc1b7295e797a6:/usr/share/elasticsearch/config/elasticsearch.yml
`

`docker restart <nom_du_conteneur>`

## Logstash

aide à traiter les journaux et autres données d'événements provenant de divers systèmes.

## Kibana

Kibana va afficher le rendu. doit être défini dans l'output du fichier de config logstash.
Sert à visualiser les données.

### Pull l'image

### Run l'image

`docker run --name kib-01 --net elastic -p 5601:5601 docker.elastic.co/kibana/kibana:8.7.1`

#### Si besoin regénerer le enrollment token.

Accéder au conteneur Docker Elasticsearch en utilisant la commande

`docker exec -it 3f1f1b6492371532a7353ba13b9caa2dc2999d87e42fef5f794f3ce17522fbd2 bash`

puis

`elasticsearch-setup-passwords auto --batch`
