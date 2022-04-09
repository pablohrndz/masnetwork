<?php
$origin = (isset($_SERVER['HTTP_ORIGIN'])) ? $_SERVER['HTTP_ORIGIN'] : "*";
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: " . $origin);

$url = "https://zenoplay.zenomedia.com/api/zenofm/nowplaying/2w2btds0qnhvv";
$dataURL = getURL($url);
$data = json_decode($dataURL);

$result = [
    "nowplaying" => null
];

if (isset($data)){
    $result["nowplaying"] = [
        "artist" => $data->artist,
        "title" => $data->title
    ];
}

echo json_encode($result);

function getURL($url){
    $result = "";
    $c = curl_init($url);
    curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
    $cr = curl_exec($c);        
    if ($cr !== false){
        $result = $cr;
    }
    curl_close($c);
    return $result;
}

?>