var data = [
    { id: 'Bender', playerId: 592450, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]", team: "[team]", nextGame: "[nextGame]" },
    { id: 'Berg', playerId: 660271, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'Lambo', playerId: 670541, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'JMart', playerId: 665742, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'Knoll', playerId: 656941, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'Tone Loc', playerId: 623993, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'SB', playerId: 624413, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'Clegg', playerId: 667670, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'WB', playerId: 621566, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'ConBud', playerId: 542303, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'Cheddar', playerId: 663728, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'MacFace', playerId: 646240, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'BNice', playerId: 665487, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'OB', playerId: 665489, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'Machete', playerId: 677951, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'Dirt', playerId: 608070, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" },
    { id: 'Mone', playerId: 669394, playerName: "[playerName]", homeRuns: "[homeRuns]", rank: "[rank]" }
];

async function load() {
    let baseURI = 'https://statsapi.mlb.com/api/v1/people/{playerId}/stats?stats=season&group=hitting&season=2025';

    let rankedCompetitors = [];
    
    for (let i = 0; i < data.length; i++) {
        const competitor = data[i];
        let statsURI = baseURI.replace('{playerId}', competitor.playerId);

        try {
            const apiResponse = await fetch(statsURI);
            const apiPlayerData = await apiResponse.json();
            if (!apiResponse.ok) { throw new Error('HTTP error! status: ${response.status}'); }

            if(apiPlayerData.stats) {
                try {
                    competitor.playerName = apiPlayerData.stats[0].splits[0].player.fullName;
                    competitor.homeRuns = apiPlayerData.stats[0].splits[0].stat.homeRuns;
                } catch(error) {
                    console.log(error);
                    competitor.homeRuns = 0;
                }
            }
        } catch(error) {
            console.log(error);
        }

        rankedCompetitors.push(competitor);
    }

    rankedCompetitors.sort((a, b) => {
        return (a.homeRuns < b.homeRuns) ? 1 : (a.homeRuns > b.homeRuns) ? -1 : 0;
    });

    const tbody = document.getElementById("body");
    for (let i = 0; i < rankedCompetitors.length; i++) {
        //const trophy = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.00 512.00" xml:space="preserve" width="256px" height="256px" fill="#000000" stroke="#000000" stroke-width="0.0051199900000000005"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon style="fill:#3EBD91;" points="386.591,10.447 125.41,10.447 125.41,186.558 175.365,260.137 340.815,260.137 386.591,186.558 "></polygon> <rect x="177.646" y="10.447" style="fill:#ECF0F1;" width="156.709" height="249.69"></rect> <rect x="219.435" y="10.531" style="fill:#3EBD91;" width="73.131" height="249.523"></rect> <ellipse style="fill:#F8C660;" cx="256.001" cy="363.22" rx="138.426" ry="138.332"></ellipse> <path style="fill:#ECF0F1;" d="M186.884,339.057l63.728-63.86c5.973-5.984,14.963-7.78,22.776-4.549 c7.814,3.231,12.909,10.854,12.909,19.308v165.545h-41.789V340.475l-28.044,28.102L186.884,339.057z"></path> <g> <path style="fill:#231F20;" d="M356.924,253.951l38.535-61.87c1.032-1.658,1.58-3.571,1.58-5.523V10.364 C397.039,4.595,392.362,0,386.591,0H125.41c-5.77,0-10.447,4.595-10.447,10.364v176.193c0,2.095,0.63,4.14,1.806,5.872 l40.48,59.556c-30.725,27.274-50.123,67.029-50.123,111.233c0,82.037,66.784,148.781,148.874,148.781 s148.874-66.743,148.874-148.781C404.874,320.066,386.389,281.152,356.924,253.951z M376.144,183.57l-31.342,50.32V20.895h31.342 V183.57z M323.908,230.841c-6.687-3.44-13.669-6.384-20.895-8.793V20.895h20.895V230.841z M282.119,20.895v195.839 c-8.482-1.507-17.21-2.294-26.118-2.294c-8.908,0-17.636,0.788-26.118,2.294V20.895H282.119z M208.988,20.895v201.152 c-7.225,2.409-14.207,5.354-20.895,8.793V20.895H208.988z M135.857,20.895h31.342v208.56l-31.342-46.111V20.895z M256.001,491.105 c-70.568,0-127.979-57.369-127.979-127.886c0-70.516,57.411-127.885,127.979-127.885S383.98,292.703,383.98,363.219 C383.98,433.736,326.569,491.105,256.001,491.105z"></path> <path style="fill:#231F20;" d="M277.382,261c-11.759-4.867-25.172-2.185-34.164,6.826l-63.728,63.868 c-4.075,4.084-4.069,10.714,0.015,14.79l29.579,29.593c1.959,1.955,4.614,3.158,7.38,3.158c0.003,0,0.007,0,0.01,0 c2.771,0,5.427-1.212,7.384-3.174l10.202-10.328v89.685c0,5.769,4.677,10.531,10.447,10.531h41.789 c5.77,0,10.447-4.761,10.447-10.531V289.957C296.745,277.228,289.143,265.863,277.382,261z M275.85,445.054h-20.895V340.475 c0-4.228-2.547-8.038-6.454-9.654c-3.908-1.615-8.402-0.718-11.389,2.275l-20.664,20.707l-14.79-14.76l56.348-56.464 c2.998-3.005,7.469-3.898,11.389-2.274c3.921,1.621,6.454,5.411,6.454,9.653V445.054z"></path> </g> </g></svg>';
        const trophy = '<svg width="30px" height="30px" viewBox="0 0 1024 1024" class="icon circle active" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M454.5 675.5l-32.4 107.9h181.8L574.5 678" fill="#FBBA22"></path><path d="M510.1 682.3c215.1 0 215.1-165.2 215.1-165.2V197.4H300.9v319.7s0 165.2 215.1 165.2h-5.9z" fill="#FBBA22"></path><path d="M515.4 783.4h91.1s89.5 2.3 89.5 80.8H332.4c0-78.6 89.5-80.8 89.5-80.8H513" fill="#C04931"></path><path d="M816.5 383.8V259.3c0-11.2-9-20.2-20.2-20.2h-50.9v-41.7c0-11.2-9-20.2-20.2-20.2H300.9c-11.2 0-20.2 9-20.2 20.2v41.7h-50.9c-11.2 0-20.2 9-20.2 20.2v124.5c0 1.2-0.7 42.2 27.2 70.9 11.7 12 26.5 19.9 43.9 23.8v38.6c0 1.6 2.1 135.7 147.8 174.7l-21.8 72.7c-39 5.7-94.5 31.2-94.5 99.7 0 11.2 9 20.2 20.2 20.2H696c11.2 0 20.2-9 20.2-20.2 0-69.6-57.2-94.7-96.6-99.9l-20.4-72.9c144.1-39.6 146.2-172.7 146.2-174.3v-38.6c17.4-3.9 32.1-11.8 43.9-23.8 27.9-28.7 27.2-69.7 27.2-70.9z m-550.8 42.7c-16-16.4-15.8-41.9-15.8-42.1V279.6h30.7v156.7c-5.7-2.4-10.8-5.6-14.9-9.8z m338.2 377.1c0.1 0 0.1 0 0 0h2c6.2 0.2 54 3 66.8 40.4h-317c12.8-37.4 60.5-40.2 66.2-40.4h182z m-154.6-40.4l19.1-63.6c12.5 1.6 25.9 2.5 40.1 2.8 0.5 0 1.1 0.1 1.6 0.1h5.9c0.5 0 1.1 0 1.6-0.1 14.9-0.3 28.8-1.3 41.9-3l17.9 63.9H449.3zM705 517c-0.1 5.9-3.5 143.6-191.9 145-17.6-0.1-33.6-1.4-48.1-3.7-1.5-0.9-3-1.7-4.7-2.2-3.2-0.9-6.3-1-9.4-0.4-127.1-27.3-129.7-133.5-129.8-138.6V217.6H705V517z m55.3-90.5c-4.1 4.2-9.1 7.4-15 9.8V279.5H776v104.8c0.1 0.3 0.3 25.8-15.7 42.2z" fill="#211F1E"></path><path d="M446.7 449.5l-11.2 65.2c-1 5.7 1.4 11.4 6 14.8 4.7 3.4 10.8 3.8 16 1.1l58.5-30.8 58.5 30.8c2.2 1.2 4.6 1.7 7.1 1.7 3.1 0 6.3-1 8.9-2.9 4.7-3.4 7-9.1 6-14.8l-11.2-65.2 47.4-46.2c4.1-4 5.6-10.1 3.8-15.5-1.8-5.5-6.5-9.5-12.2-10.3L559 368l-29.3-59.3c-2.6-5.2-7.8-8.4-13.6-8.4s-11 3.3-13.6 8.4L473.2 368l-65.5 9.5c-5.7 0.8-10.4 4.8-12.2 10.3-1.8 5.5-0.3 11.5 3.8 15.5l47.4 46.2z m38.8-52.6c4.9-0.7 9.2-3.8 11.4-8.3l19.2-38.9 19.2 38.9c2.2 4.5 6.5 7.6 11.4 8.3l43 6.2-31.1 30.3c-3.6 3.5-5.2 8.5-4.4 13.4l7.3 42.8-38.4-20.2c-4.4-2.3-9.7-2.3-14.1 0l-38.4 20.2 7.3-42.8c0.8-4.9-0.8-9.9-4.4-13.4l-31.1-30.3 43.1-6.2z" fill="#211F1E"></path></g></svg>';
        const competitor = rankedCompetitors[i];

        if(i == 0) {
            competitor.rank = trophy;
        } else {
            competitor.rank = i + 1;
        }
        if(i != 0) {
            if(rankedCompetitors[i].homeRuns == rankedCompetitors[i-1].homeRuns) {
                competitor.rank = rankedCompetitors[i-1].rank;
            }
        } else {
            competitor.rank = trophy;
        }
        
        const row = document.createElement('tr');
        let rowInnerHTML = '<td>' + competitor.rank + '</td><td>' 
            + competitor.id + '</td><td>' 
            + competitor.playerName + '</td><td class="homeRuns">' 
            + competitor.homeRuns + '</td>';
        row.innerHTML = rowInnerHTML;
        tbody.appendChild(row);
    }

    const loader = document.getElementById("loader");
    loader.classList.add("hide-loader");

    const table = document.getElementById("rankTable");
    table.removeAttribute("hidden");
    
}
load();