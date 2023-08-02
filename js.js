img = "";
status = "";
objects = [];

function preload()
{
img = loadImage('Cat And Tiger.jpg');
}

function setup()
{
    canvas = createCanvas(500, 390);
    canvas.center();
    video = createCapture(VIDEO);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    video.size(500, 390);
    video.hide();
    
}

function draw()
{
    image(video, 0, 0, 500, 390);
    
    if (status != "")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
            fill("#F28500");
            strokeWeight(0.5);
            percent = floor(objects[i].confidence * 100);
            textSize(15);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y + 20);
            noFill();
            strokeWeight(3);
            stroke("#F28500");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

    
}

function modelLoaded()
{
    console.log("Model Loaded!")
    status = true;
    
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}