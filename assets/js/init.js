$(document).ready(function () {
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

    var test = await fetchData();
    buildTable(test);

    function fetchData() {
        //return new Promise((resolve, reject) => {
            var competitors = [];
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
                    competitors.push(competitor);
                    competitors = competitors.sort((a, b) => {
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
            return competitors;
            //console.log(competitors.length);
            //resolve();
        //});
    }

    function buildTable(competitors) {
        return new Promise((resolve, reject) => {
            const TR = "<tr>{data}</tr>";
            const TD = "<td>{data}<td>";
    
            const table = document.getElementById("rankTable");
            console.log(table);
    
            //console.log(competitors.length);
            competitors.forEach(competitor => {
                console.log(competitor);
                
                const aliasColumn = TD.replace("{data}", competitor.id);
                const playerColumn = TD.replace("{data}", competitor.playerName);
                const homeRunsColumn = TD.replace("{data}", competitor.homeRuns);
                
                let columns = [aliasColumn, playerColumn, homeRunsColumn];
    
                let row = TR.replace("{data}", columns.join(''));
                table.appendChild(row);
            })
            resolve();
        })
    }
});