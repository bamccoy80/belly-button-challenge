//function that populates the meta data
function demoInfo(sample)
{
    //use d3.json to get the data
    d3.json("samples.json").then((data) => {
        //grab the metadata
        let metaData = data.metadata;

        // filter based on the value of 1 sample based on th dataset
        let result = metaData.filter(sampleResult => sampleResult.id == sample);
        //console.log(result);

        //access index 0 from the array
        let resultData = result[0];
        //console.log(resultData);

        // clear the metadata out 
        d3.select("#sample-metadata").html("");

        // use Objects.entries to get the value key pairs
        Object.entries(resultData).forEach(([key, value]) =>{
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);

        });
    });
}

//function that builds the bar chart
function buildBarChart(sample)
{


    d3.json("samples.json").then((data) => {
        //grab the samples
        let sampleData = data.samples;
        
       
        // filter based on the value of 1 sample based on th dataset
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
       
       
        //access index 0 from the array
        let resultData = result[0];
       

        //get the otu_ids, otu_labels and sample values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;

        //build bar chart
        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
        let xValues = sample_values.slice(0,10);
        let textLabels = otu_labels.slice(0,10);


        let barChart = {
            y: yticks.reverse(),
            x: xValues.reverse(),
            text: textLabels.reverse(),
            type: "bar",
            orientation: "h"
        }
        let layout = {
            title: "Top 10 Belly Button Bacteria"
        };

        Plotly.newPlot("bar", [barChart], layout);


    });
}

// function that builds the bubble chart
function buildBubbleChart(sample)
{


    d3.json("samples.json").then((data) => {
        //grab the samples
        let sampleData = data.samples;
        
       
        // filter based on the value of 1 sample based on th dataset
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
       
       
        //access index 0 from the array
        let resultData = result[0];
       

        //get the otu_ids, otu_labels and sample values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;



        let bubbleChart = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids, 
                colorscale: "Earth"
            }
        }
        let layout = {
            title: "Bacteria Cultures Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        };

        Plotly.newPlot("bubble", [bubbleChart], layout);


    });
}

// function that initialize the dashboard
function initialize()
{

    //access the dropdown selector from the index.html file
    var select = d3.select("#selDataset");

    //use d3.json to get the data
    d3.json("samples.json").then((data) => {
        let sampleNames = data.names; //made an array with just names
        //console.log(sampleNames);

        //use a foreach in order to create options for each sample in the selector
        sampleNames.forEach((sample)=> {
            select.append("option")
                .text(sample)
                .property("value", sample);
        });

        // pass in the info for the first sample
        let sample1 = sampleNames[0];

        //call function to build metadata
        demoInfo(sample1);
        //call function to build bar chart
        buildBarChart(sample1);
        // function that builds the bubble chart
        buildBubbleChart(sample1)

    });


}

//function that updates dashboard
function optionChanged(item)
{
    //call the update to the metadata
   demoInfo(item);
   //call function to build the bar chart
   buildBarChart(item);
   // call bubble chart
   buildBubbleChart(item);
}

// call the initalize function
initialize();
