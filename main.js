function plotTrend(){
    var chart = new Highcharts.chart('trendChart', {
        navigation: {
            buttonOptions: {
                enabled: false
            }
        },
        chart: {
            type: 'column',
            height: 600,
            events: {
                click: function() {
                    if (chart.title.textStr == 'Number of Prisoners in the U.S., 1925-2015') {
                        chart.update ({
                            data : {
                            csvURL: window.location.origin + '/data/trend_rate.csv'
                            },
                            title: {
                                text: 'Proportion of U.S. Prisoners, 1925-2015',
                            },
                            subtitle: {
                                text: 'Number of Prisonsers For Every 100K U.S. Citizens'

                            },
                            yAxis: {
                                title: {
                                    text: '# of Prisoners per 100K people'
                                }
                            },
                            series: [
                                {color: '#2A363B'}
                            ],
                        })
                    } else {
                        chart.update ({
                            data : {
                            csvURL: window.location.origin + '/data/trend_count.csv'
                            },
                            title: {
                                text: 'Number of Prisoners in the U.S., 1925-2015',
                            },
                            subtitle: {
                                text:'2015 Has 15 Times More Prisoners Than 1925'
                            },
                            yAxis: {
                                title: {
                                    text: 'Number of Prisoners'
                                }
                            },
                            series: [
                                {color: '#E84A5F'}
                            ],
                        })
                    }
                }
            }
        },
        backgroundColor: 'transparent',
        data: {
            // enablePolling: true,
            csvURL: window.location.origin + '/data/trend_count.csv'
        },
        legend: {
            enabled: false
        },
        title: {
            text: 'Number of Prisoners in the U.S., 1925-2015',
            style: {
                fontWeight:'bold',
                // fontFamily:'"PT Serif", serif',
                fontSize:'2em'
            }
        },
        subtitle: {
            text: '15 Times More Prisoners Than 1925',
            style: {
            }
        },
        yAxis: {
            title: {
                text: '# of Prisoners'
            }
        },
        series: [
            {color: '#E84A5F',
        dataLabels: {
            enabled: true,
            X:100,
            y:-40,
            useHTML:true,
            align:'right',
            verticalAlign:'middle',
            crop:false,
            overflow:'none',
            allowOverlap:true,
            // shape:'round',

            formatter: function() {
                if (this.key == 1994) {
                    return '<div class="callout">1994: Violent Crime<br>and Law Enforcement Act<br>Contributed to mass incarceration</div>';

                }
                if(this.key == 1990) {
                    return '<div class="callout">1990s Three-Strikes Laws<br>impose harsher sentences</div>'
                }
                if(this.key == 1970) {
                    return '<div class="callout">In 1970,Nixon declared <br>"War on Drugs"</div>'

                }
                if(this.key == 2010) {
                    return '<div class="callout">In 2010, Fair Sentencing Act was passed</div>'
                }
                else {
                    return ''
                }
            }
        }}
            
        ],
        // plotOptions: {
        //     dataLabels: {
        //         formatter: function() {
        //             return 'Callout'
        //         }
        //     }

        credits: {
			enabled: false
        },
    });
}
function plotArea() {
    Highcharts.getJSON('/data/offenses.json', function(json) {
        let types = Object.keys(json)
        
        series = []
        for (type in types) {
            key = types[type]
            datas = []
            for (i in json[key]) {
                if (json[key][i]['year'] % 5 != 0) {
                    continue;
                }
                datas = datas.concat([[json[key][i]['year'], json[key][i]['count']]])
    
            }

            if (key == 'Drug') {
                series = series.concat({name: key, data: datas, marker: {enabled: false}});
            } else {
                series = series.concat({name: key, data: datas, marker: {enabled: true}, visible: true})
            };

        }
        Highcharts.chart('mapChart', {
            navigation: {
                buttonOptions: {
                    enabled: false
                }
            },
            title: {
                text: 'Number of Prisoners By Offense Type, 1980 - 2015',
                style: {
                    fontWeight:'bold',
                    fontSize:'2em'
                }
                
            },
            subtitle: {
                text:'Proportion of Drug Offenders Increased by 200%',
            },
            chart: {
                type: 'column',
                height: 600
            },
            legend : {
                verticalAlign:'top',
            },
            yAxis: {
                labels: {
                    format: this.value/1000
                },
                title: {
                    enabled: false
                },
                stackLabels: {
                    style: {
                        color: 'black'
                    },
                    enabled: true,
                    shape: 'callout',
                    useHTML: true,
                    formatter: function() 
                    {if (this.x== 1985) {return '<div class="callout">1986 Regan passed<br> "Anti-Drug Abuse Act"</div>'} 
                    if (this.x == 2010) {return'<div class="callout">2012 Many states<br> Legalized Marijuana Production</div>'}
                    else {return null}
                    }
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y} cases)<br/>',
                split: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
    
                accessibility: {
                    pointDescriptionFormatter: function (point) {
                        function round(x) {
                            return Math.round(x * 100) / 100;
                        }
                        return (point.index + 1) + ', ' + point.category + ', ' +
                            point.y + 'cases, ' + round(point.percentage) + '%, ' +
                            point.series.name;
                    }
                }
            },
            series: series,
            credits: {
                enabled: false
            },
        })
    })
    Highcharts.theme = {
        colors: ['#E84A5F', '#FECEAB', '#FF847C', '#99B898', '#2A363B']}
    Highcharts.setOptions(Highcharts.theme);
}
function plotMap() {
Highcharts.getJSON('/data/state_distribution.json', function (data) {

  data.forEach(function (p) {
    
    p.code = p.code.toUpperCase();
  });
Highcharts.mapChart('barChart', {
    navigation: {
        buttonOptions: {
            enabled: false
        }
    },
    chart: {
        map: 'countries/us/us-all',
        height: 750,
        
    },
    mapNavigation: {
        enabled: false
    },
    colorAxis: {
        min: 4,
        max: 9,
        minColor: 'white',
        maxColor: '#E82A2A',
    },
    credits: {
        enabled: false
    },
    exporting: {
        sourceWidth: 600,
        sourceHeight: 750
    },
    title: {
        text: 'Average Incarceration Rate by State since 2000',
        style: {
            fontWeight:'bold',
            // fontFamily:'"PT Serif", serif',
            fontSize:'2em'
        }
    },
    subtitle: {
        text:'South Carolina, New Mexico and Arizona have the highest'
    },
    legend: {
        verticalAlign:'top',
        // labelFormatter: function() {
        //     console.log(this);
        //     return (this.from + '‰')
        // },
        // need a percentage(thousandth) after each legend label
    },
    series: [{
        animation: {
            duration: 1000
        },
        data: data,
        joinBy: ['postal-code', 'code'],
        dataLabels: {
            enabled: true,
            color: '#FFFFFF',
            format: '{point.code}'
        },
        name: 'Percent of Incarceration',
        tooltip: {
            pointFormat: '{point.code}: {point.value}‰'
            }
        }]
    });
});

}
function plotBar() {
    Highcharts.getJSON('/data/releases_admissions.json', function(json) {
        let years = Object.keys(json)
        admission_datum = [];
        releases_datum = [];
        admission_absolute = [];
        releases_absolute = [];
        for (i in years) {
            year = years[i];
            admission_datum = admission_datum.concat([[Number(year), json[year]['admits']]]);
            releases_datum = releases_datum.concat([[Number(year), json[year]['releases']]]);
            if (json[year]['admits'] - json[year]['releases'] > 0) {
                admission_absolute = admission_absolute.concat([[Number(year), json[year]['admits'] - json[year]['releases']]])
                releases_absolute = releases_absolute.concat([[Number(year), 0]])
            } else {
                admission_absolute = admission_absolute.concat([[Number(year), 0]])
                releases_absolute = releases_absolute.concat([[Number(year), json[year]['releases'] - json[year]['admits']]])
            }
        }
        Object.freeze(releases_datum);
        Object.freeze(admission_datum);
        Object.freeze(releases_absolute);
        Object.freeze(admission_absolute);
        const prime_series = [{name: 'Releases', data: releases_datum, yAxis: 0, color: '#2A363B'}, 
                    {name: 'Admits', data: admission_datum, yAxis: 1, color: '#E84A5F'}]
        const sub_series = [{name: 'Absolute Releases', data: releases_absolute, yAxis: 0, color: '#2A363B'}, 
                        {name: 'Absolute Admits', data: admission_absolute, yAxis: 1, color: '#E84A5F'}]
        var chart = Highcharts.chart('areaChart', {
            chart: {
                height: 600,
                type: 'bar',
                events: {
                    click: function() {
                        if (chart.title.textStr == 'Number of Releases vs. Admitted per Year, 1978-2015') {
                            chart.update(
                                {   
                                    title: {
                                        text: 'Absolute Number of Releases vs. Admitted per Year, 1978-2015'
                                    },
                                    series: sub_series
                                }
                            )
                        } else {
                            chart.update(
                                {   
                                    title: {
                                        text: 'Number of Releases vs. Admitted per Year, 1978-2015'
                                    },
                                    series: prime_series
                                }
                            )
                        }
                    }
                }
            },
            title: {
                text: 'Number of Releases vs. Admitted per Year, 1978-2015',
                
                style: {
                    fontWeight:'bold',
                    // fontFamily:'"PT Serif", serif',
                    fontSize:'2em'
                }
            },
            subtitle: {
                text:'FYI: Average Sentence Length is 5 years'
            },
            yAxis: [{title: { text: null },
                width: 520,
                reversed: true}, 
                {offset: 0,
                    title: { text: null },
                    left: 575,
                    width: 520}],
            plotOptions: {
                series: {
                    stacking: 'normal',
                }
            },
            tooltip: {
                shared: true,
                crosshairs: true,
                borderColor: Highcharts.getOptions().colors[2],
                followPointer: true
              },
            series: prime_series,
            exporting: {
                enabled: false
              },
            credits: {
                enabled: false
              },
        })
    })
}



function init(){
    $('.awesome-tooltip').tooltip({
        placement: 'left'
    });   
    $(window).bind('scroll',function(e){
        dotnavigation();
    });
    function dotnavigation(){  
        var numSections = $('section').length;
        
        $('#dot-nav li a').removeClass('active').parent('li').removeClass('active');     
        $('section').each(function(i,item){
        var ele = $(item), nextTop;        
        if (typeof ele.next().offset() != "undefined") {
        nextTop = ele.next().offset().top;
        }
        else {
        nextTop = $(document).height();
        }
        if (ele.offset() !== null) {
        thisTop = ele.offset().top - ((nextTop - ele.offset().top) / numSections);
        }
        else {
        thisTop = 0;
        }
        var docTop = $(document).scrollTop();
        if(docTop >= thisTop && (docTop < nextTop)){
        $('#dot-nav li').eq(i).addClass('active');
        }
        if ((docTop >= nextTop) && (i == 0) && ($('#trendChart').highcharts() == null)) {
            plotTrend()
        }
        if ((docTop >= nextTop) && (i == 1) && ($('#areaChart').highcharts() == null)) {
            plotBar()
        }
        if ((docTop >= nextTop) && (i == 2) && ($('#mapChart').highcharts() == null)) {
            plotArea()
        }
        if ((docTop >= nextTop) && (i == 3) && ($('#barChart').highcharts() == null)) {
            plotMap()
        }
        });
    }
}

$(document).ready(init());
$(Highcharts.charts).each(function(i,chart){
    var height = chart.renderTo.clientHeight; 
    var width = chart.renderTo.clientWidth; 
    chart.setSize(width, height); 
  });


