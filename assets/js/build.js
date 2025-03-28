var data = [
    { id: 'BS', playerId: 592450, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'CB', playerId: 660271, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'RL', playerId: 670541, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'JMM', playerId: 665742, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'MK', playerId: 656941, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'TL', playerId: 623993, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'SB', playerId: 624413, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'CS', playerId: 667670, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'WB', playerId: 621566, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'CM', playerId: 542303, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'MS', playerId: 663728, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'JJM', playerId: 646240, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'BW', playerId: 665487, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'OT', playerId: 665489, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'MM', playerId: 677951, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'AA', playerId: 608070, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'BB', playerId: 669394, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" }
];

//var competitors = [];

/*
const t1 = {
    id: 'BS',
    details: {
        playerId: 656941,
        homeRuns: 1}
    };
const t2 = {
    id: 'JM',
    details: {
        playerId: 660271, 
        homeRuns: 2}
    };
var data = [];
data.push(t1);
data.push(t2);
*/

async function init() {
    //let competitors = [];
    var rankedCompetitors = [];
    let baseURI = 'http://statsapi.mlb.com/api/v1/people/{playerId}/stats?stats=season&group=hitting&season=2025';

    const table = document.getElementById("rankTable");
    console.log(table);
    const tbody = table.getElementsByTagName("tbody");

    const TR = "<tr>{data}</tr>";
    const TD = "<td>{data}</td>";

    data.forEach(async (competitor) => {
        var competitors = [];
        let statsURI = baseURI.replace('{playerId}', competitor.playerId);

        try {
            const response = await fetch(statsURI);
            const player = await response.json();
            if (!response.ok) { throw new Error('HTTP error! status: ${response.status}'); }
            
            if(player.stats) {
                try {
                    competitor.playerName = player.stats[0].splits[0].player.fullName;
                    competitor.homeRuns = player.stats[0].splits[0].stat.homeRuns;
                } catch(error) {
                    console.log(error);
                    competitor.homeRuns = 0;
                }
            }
            competitors.push(competitor);
            console.log(competitors);
            competitors = competitors.sort((a, b) => {
                return (a.homeRuns < b.homeRuns) ? 1 : (a.homeRuns > b.homeRuns) ? -1 : 0;
            })
            
        } catch(error) {
            console.log(error);
        }
    })
    rankedCompetitors = competitors;
    console.log(rankedCompetitors);
    console.log(rankedCompetitors.length);
    

    

    //console.log(competitors.length);
    competitors.forEach(competitor => {
        console.log(competitor);
        
        
    })
}

async function load() {
    //TODO: Build list of Player Ids
    //TODO: Build a list of People:
        //Rank, Player, HR, Next Game?
    
    //console.log(data[0]);

    /*
    //TODO: Test area for JSON Parsing - DELETE WHEN DONE.
    let ohtaniURI = 'http://statsapi.mlb.com/api/v1/people/660271/stats?stats=season&group=hitting&season=2025';
    const response = await fetch(ohtaniURI);
    console.log(response);
    const responseJSON = await response.json();
    console.log(responseJSON);
    console.log(responseJSON.stats);
    console.log(responseJSON.stats[0].splits[0].player.fullName);
    console.log(responseJSON.stats[0].splits[0].stat.homeRuns);
    //const player = JSON.parse(responseJSON);
    //console.log(player.stats);
    */
    //console.log(competitors);
    //var competitors = [];
    
    var competitors = await fetchData();
    console.log('yep');
    console.log(competitors);
    console.log(competitors.length);
    //await buildTable(competitors);
    //console.log('after buildtable');
    competitors.forEach(c => {
        console.log(c);
    })
    
    //--------------------------------
    /*
    await fetchData()
        .then(result => {
            console.log(result);
            console.log(result.length);
            //await buildTable(result);
            result.forEach(r => {
                console.log(r);
            })
        })
    //--------------------------------
    */

    //.then(result => {
            /*
            console.log('here');
            console.log(result.length);
            console.log(result);
            console.log('working');
            console.log(result[10]);
            result.sort((a, b) => {
                console.log(a);
                //return (a.homeRuns < b.homeRuns) ? -1 : (a.homeRuns > b.homeRuns) ? 1 : 0;
                console.log(a.playerId);
                return b.id - a.id;
            })
            console.log(result);
            */
            //result.forEach(r => {
             //   console.log(blah);
           // })
        //})

    /*
    console.log(competitors);
    //competitors = await rank(competitors);
    competitors.sort((a, b) => { 
        console.log(parseInt(a.homeRuns));
        //return b.homeRuns - a.homeRuns; 
        //return a.homeRuns.data.localeCompare(a.homeRuns.data);
        if (parseInt(a.homeRuns) - parseInt(b.homeRuns)) return 1;
        if (parseInt(a.homeRuns) - parseInt(b.homeRuns)) return -1;
        return 0;
    });
    let test = bubbleSort(competitors);
    console.log(test);
    /*
    competitors.sort((a,b) => {
        console.log(a.homeRuns);
        if (a.homeRuns < b.homeRuns) { return -1; }
        if (a.homeRuns > b.homeRuns) { return 1; }
        return 0;
    });
    */
    //var rankedCompetitors = competitors.sort(compare);
    //console.log(rankedCompetitors);
    //console.log(competitors);
    //----------------------------------------------------------
}

async function fetchData() {
    //return new Promise((resolve) => {
        var rankedCompetitors = [];
        let baseURI = 'http://statsapi.mlb.com/api/v1/people/{playerId}/stats?stats=season&group=hitting&season=2025';

        data.forEach(async (competitor) => {
            let statsURI = baseURI.replace('{playerId}', competitor.playerId);
            //console.log(statsURI);
            //console.log(competitor);
            //index = data.findIndex(c => competitor.id == c.id);
            //console.log(competitor.id + '|' + index);

            try {
                const response = await fetch(statsURI);
                const player = await response.json();
                if (!response.ok) { throw new Error('HTTP error! status: ${response.status}'); }
                
                if(player.stats) {
                    try {
                        competitor.playerName = player.stats[0].splits[0].player.fullName;
                        //console.log(data[index]);
                        //data[index].playerName = player.stats[0].splits[0].player.fullName;
                        competitor.homeRuns = player.stats[0].splits[0].stat.homeRuns;
                        //data[index].homeRuns = player.stats[0].splits[0].stat.homeRuns;
                    } catch(error) {
                        //console.log(error);
                        //competitor.playerName = player.stats[0].splits[0].player.fullName;
                        //competitor.homeRuns = player.stats[0].splits[0].stat.homeRuns;
                        competitor.homeRuns = 0;
                        //data[index].homeRuns = 0;
                    }
                }
                rankedCompetitors.push(competitor);
                rankedCompetitors = rankedCompetitors.sort((a, b) => {
                    return (a.homeRuns < b.homeRuns) ? 1 : (a.homeRuns > b.homeRuns) ? -1 : 0;
                })
            } catch(error) {}
            //console.log(competitor);
            
            //console.log(competitors);
        });
        //console.log(competitors);
        //competitors.sort((a, b) => { 
            //console.log(a.homeRuns);
            //return b.homeRuns - a.homeRuns; 
            //return a.homeRuns.data.localeCompare(a.homeRuns.data);
            //if (a.homeRuns - b.homeRuns) return 1;
            //if (a.homeRuns - b.homeRuns) return -1;
            //return 0;
        //});
        //console.log(competitors)
        //return competitors;
        //console.log(competitors.length);
        //resolve(rankedCompetitors);
        return rankedCompetitors;
    //});
}

async function buildTable(rankedCompetitors) {
    //return new Promise((resolve) => {
        const TR = "<tr>{data}</tr>";
        const TD = "<td>{data}<td>";

        const table = document.getElementById("rankTable");
        console.log(table);

        //console.log(competitors.length);
        rankedCompetitors.forEach(competitor => {
            console.log(competitor);
            
            const aliasColumn = TD.replace("{data}", competitor.id);
            const playerColumn = TD.replace("{data}", competitor.playerName);
            const homeRunsColumn = TD.replace("{data}", competitor.homeRuns);
            
            let columns = [aliasColumn, playerColumn, homeRunsColumn];

            let row = TR.replace("{data}", columns.join(''));
            table.appendChild(row);
        })
        //resolve();
    //})
}

function compare(a, b) {
    /*
    const ranked = [...competitors].sort((c1, c2) => c2.homeRuns - c1.homeRuns);
    console.log(ranked);
    const test = competitors.map((hr) => ranked.indexOf(hr) + 1);
    console.log(test);
    console.log(competitors);
    
    //const sorted = [...arr].sort((a, b) => b - a);
    //return arr.map((x) => sorted.indexOf(x) + 1);
    */
   //competitors.sort((a, b) => {
       //console.log(a);
       //console.log(a.homeRuns < b.homeRuns);
       //return (a.homeRuns < b.homeRuns) ? -1 : (a.homeRuns > b.homeRuns) ? 1 : 0;
       //console.log(a);
       //console.log(b);
       //console.log(a.homeRuns);
       //return a.homeRuns - b.homeRuns;
       
       //console.log(b.homeRuns);
       //if (a.homeRuns === b.homeRuns) { return 0; }

        //return a.homeRuns < b.homeRuns ? -1 : 1;
   //})
   //console.log(ranked);
   //console.log(competitors);
   //return competitors;

    if ( a.homeRuns < b.homeRuns ){
        return -1;
    }

    if ( a.homeRuns > b.homeRuns ){
        return 1;
    }

    return 0;

}

function bubbleSort(arr) {
    let len = arr.length;
    let swapped;
  
    do {
      swapped = false;
      for (let i = 0; i < len - 1; i++) {
          console.log(arr[i].homeRuns);
        if (arr[i].homeRuns > arr[i + 1].homeRuns) {
          // Swap elements
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;
        }
      }
      len--; // Optimization: Reduce iterations as the largest elements are bubbled to the end
    } while (swapped);
  
    return arr;
  }
init();