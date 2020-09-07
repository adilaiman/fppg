import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const PlayerCard = ({ player, teams, fixtures, higherFPPG, onCardClick}) => {
    let teamName;
    let nextMatchDate = 'TBD';
    let nextMatchOpId;
    let nextMatchOpName = 'TBD';
    let fppg;

    const [cardSelectColor, setCardSelectColor] = useState('#fff');
    const [fppgHidden, setFppgHidden] = useState(true);

    if (fppgHidden) {
        fppg = '?';
    } else {
        fppg = player.fppg ? player.fppg.toFixed(2) : '';
    }

    fixtures.forEach(fixture => {
        if (player.team._members[0] === fixture.away_team.team._members[0]) {
            nextMatchDate = fixture.start_date;
            nextMatchOpId = fixture.home_team.team._members[0];
        }
        if (player.team._members[0] === fixture.home_team.team._members[0]) {
            nextMatchDate = fixture.start_date;
            nextMatchOpId = fixture.away_team.team._members[0];
        }
    });

    teams.forEach(team => {
        if (team.id === player.team._members[0]) {
            teamName = team.full_name;
        }

        if (team.id === nextMatchOpId) {
            nextMatchOpName = team.full_name;
        }
    });
    
    return (
        <div 
            className='player-card'
            style={{border:`3px solid ${cardSelectColor}`}}
            onClick={() => {
                    onCardClick(player._id === higherFPPG);
                    if (player._id === higherFPPG) {
                        setCardSelectColor('green');
                    } else {
                        setCardSelectColor('red');
                    }
                    setFppgHidden(false);
                }
            }
        >
            <div className='top-card'>
                <img src={player.images.default.url}/>
                <h3 className='fppg'>{fppg}</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th colSpan='3'>{player.first_name + ' ' + player.last_name}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Team</td>
                        <td>{teamName}</td>
                    </tr>
                    <tr>
                        <td>Position</td>
                        <td>{player.position}</td>
                    </tr>
                    <tr>
                        <td>Played</td>
                        <td>{player.played}</td>
                    </tr>
                    <tr>
                        <td>Injured</td>
                        <td>{player.injured ? 'Yes': 'No'}</td>
                    </tr>
                    <tr>
                        <td>Next Match</td>
                        <td>{nextMatchOpName}</td>
                    </tr>
                    <tr>
                        <td>Next Match Date</td>
                        <td>{nextMatchDate.slice(0,10)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

PlayerCard.propTypes = {
    player: PropTypes.object.isRequired,
    teams: PropTypes.array.isRequired,
    fixtures: PropTypes.array.isRequired,
    higherFPPG: PropTypes.string.isRequired,
    onCardClick: PropTypes.func.isRequired,
}