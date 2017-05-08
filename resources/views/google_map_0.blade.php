<?php
/**
 * Created by PhpStorm.
 * User: Albert Lin
 * Date: 2017/5/3
 * Time: 下午 01:49
 */
?>

<html>
<head>
    <meta charset="UTF-8">
    <title>Google Map</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAXraHQiIx099EwYlhMlLmvfnHgFqVFAGg"> </script>
    <style>

        html, body, #app{
            width: 100%;
            height: 100%;
            padding: 0;
            border: 0;
            margin: 0;
        }

        .google_map{
            width: 100%;
            height: 100%;
            padding: 0;
            border: 0;
            margin: 0;
            position: absolute;
            z-index: 0;
        }

        #opt-content{
            height: 100%;
            padding: 0;
            border: 0;
            margin: 0;
            background-color: #a5a5a7;
            transform: translateX(-100%);
            transition: 0.7s;
            z-index: 1;
            box-shadow: 10px 0 30px rgba(120, 120, 150, 0.3);
        }

        #opt-btn{
            width: 60px;
            height: 100%;
            padding: 0;
            border: 0;
            margin: 0;
            top: 0;
            background-color: #555577;
            position: absolute;
            z-index: 2;
            box-shadow: 10px 0 30px rgba(120, 120, 150, 0.3);
        }
    </style>
</head>
<body>

    <div id="app">
	    <div  class="google_map">
		    <google_map :center="data.map.center"></google_map>
			<map_ctrl_panel :controllers="data.ctrlPanel.ctrls" style="top: 100px; right: 10px;"></map_ctrl_panel>
	    </div>
        <div id="opt-content" class="col-lg-3 col-md-4 col-sm-6 col-xs-8">

            <card :prop="{
                    head: {icon:'glyphicon-fire'},
                  }">
            </card>

        </div>
        <fun_bar id="opt-btn" class="col-lg-1"
                 :items="items"
                 :width="60"
                 :height="60"
                 v-on:item-click="funBarClick">
        </fun_bar>
    </div>

</body>
<script src="http://vue.semanticlab.com/js/google_map_0.js"></script>
</html>
