import React, { FC, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SteamInstructions from "../assets/steam-instructions.jpg";
import { Button, Form, ListGroup } from "react-bootstrap";

export interface SteamApi {
  playerstats: Playerstats;
}
export interface Playerstats {
  steamID: string;
  gameName: string;
  stats?: StatsEntity[] | null;
  achievements?: AchievementsEntity[] | null;
}
export interface StatsEntity {
  name: string;
  value: number;
}
export interface AchievementsEntity {
  name: string;
  achieved: number;
}

export const Stats: FC = () => {
  //State
  const initialValues = { steamId: "" };
  const [values, setValues] = useState(initialValues);
  const [dbdStats, setDbdStats] = useState<SteamApi>();
  const [survivorStats, setSurvivorStats] = useState<StatsEntity[]>();
  const [killerStats, setKillerStats] = useState<StatsEntity[]>();
  const [genericStats, setGenericStats] = useState<StatsEntity[]>();

  //Dictionaries
  const killerStatLookup: any = {
    DBD_KillerSkulls: "Killer rank (pips)",
    DBD_KilledCampers:
      "Survivors killed (mori, devour hope, rancor, pig traps...)",
    DBD_SacrificedCampers: "Survivors sacrificed",
    DBD_TrapPickup: "Bear trap catches (trapper)",
    DBD_ChainsawHit: "Chainsaw hits (hillbilly)",
    DBD_CamperMaxScoreByCategory:
      "Survivor perfect games (5k+ in all categories)",
    DBD_SlasherMaxScoreByCategory:
      "Killer perfect games (5k+ in all categories)",
    DBD_UncloakAttack: "Uncloack attacks (wraith)",
    DBD_SlasherFullLoadout: "Played killer with full loadout",
    DBD_SlasherChainAttack: "Blink attacks (nurse)",
    DBD_DLC3_Slasher_Stat1: "Phantasms triggered (hag)",
    DBD_DLC4_Slasher_Stat1: "Shocks (doctor)",
    DBD_DLC8_Slasher_Stat1: "Reverse bear traps placed (pig)",
    DBD_SlasherTierIncrement: "Evil Within tiers ups (myers)",
    DBD_DLC4_Slasher_Stat2:
      "Trials with all survivors in madness tier 3 (doctor)",
    DBD_DLC6_Slasher_Stat1: "Downed survivors with chainsaw (leatherface)",
    DBD_DLC6_Slasher_Stat2:
      "Survivors hooked in the basement (once per survivor)",
    DBD_DLC8_Slasher_Stat2:
      "Survivors killed or sacrificed after all generators are repaired",
    DBD_DLC5_Slasher_Stat1: "Hatchets thrown (huntress)",
    DBD_DLC7_Slasher_Stat1: "Survivors to dream state (krueger)",
    DBD_DLC7_Slasher_Stat2: "Obsessions sacrificed",
    DBD_Chapter15_Slasher_Stat1:
      "Downed survivors while speared (deathslinger)",
    DBD_Chapter15_Slasher_Stat2: "Survivors grabbed while cleansing a totem",
    DBD_Event1_Stat1:
      "Had at least 3 survivors hooked in the basement at same time",
    DBD_DLC9_Slasher_Stat1: "Generators damaged with a survivor hooked",
    DBD_DLC9_Slasher_Stat2: "Downed survivors while intoxicated (clown)",
    DBD_Chapter9_Slasher_Stat1:
      "Hit a survivor who dropped a pallet within a chase",
    DBD_Chapter9_Slasher_Stat2: "Downed survivors after haunting (spirit)",
    DBD_Chapter10_Slasher_Stat1: "Hit a survivor while carrying another",
    DBD_Chapter10_Slasher_Stat2:
      "Downed survivors while in deep wound (legion)",
    DBD_Chapter11_Slasher_Stat1:
      "Sacrificed all survivors before last generator is repaired",
    DBD_Chapter11_Slasher_Stat2:
      "Downed survivors while in max sickness (plague)",
    DBD_Chapter12_Slasher_Stat1:
      "Survivors grabbed while repairing a generator",
    DBD_Chapter12_Slasher_Stat2: "Downed survivors while marked (ghostface)",
    DBD_Chapter13_Slasher_Stat1: "Hatches closed",
    DBD_Chapter13_Slasher_Stat2: "Downed survivors using shred (demogorgon)",
    DBD_Chapter14_Slasher_Stat1: "Hooked a survivor while everyone is injured",
    DBD_Chapter14_Slasher_Stat2:
      "Downed survivors while using blood fury (oni)",
  };
  const genericStatLookup: any = {
    DBD_BloodwebPoints: "Bloodpoints earned",
    DBD_MaxBloodwebPointsOneCategory:
      "Total amount of points earned after maxing one category",
    DBD_UnlockRanking: "Ranked up",
    DBD_Event1_Stat3: "Mystery boxes opened in bloodwebs",
  };
  const survivorStatLookup: any = {
    DBD_CamperSkulls: "Survivor rank (pips)",
    DBD_GeneratorPct_float: "Equivalent generators repaired",
    DBD_HealPct_float: "Equivalent survivors healed",
    DBD_EscapeKO: "Escaped while crawling",
    DBD_Escape: "Escaped while healty/injured",
    DBD_SkillCheckSuccess: "Successful skill checks",
    DBD_HookedAndEscape: "Escaped after unhooking self",
    DBD_UnhookOrHeal: "Survivors unhooked or healed from dying state",
    DBD_UnhookOrHeal_PostExit:
      "Survivors unhooked or healed from dying state in endgame",
    DBD_EscapeThroughHatch: "Escaped through the hatch",
    DBD_CamperFullLoadout: "Played survivor with full loadout",
    DBD_CamperNewItem: "Escaped with new item",
    DBD_CamperKeepUltraRare: "Escaped with ultra rare item",
    DBD_AllEscapeThroughHatch: "Escaped through the hatch with everyone",
    DBD_CamperEscapeWithItemFrom:
      "Escaped with item someone else brought into game",
    DBD_EscapeNoBlood_MapAsy_Asylum:
      "Escaped from Crotus Prenn Asylum with no bloodloss",
    DBD_FixSecondFloorGenerator_MapAsy_Asylum:
      "Repaired 2nd floor generator and escaped from Disturbed Ward",
    DBD_FixSecondFloorGenerator_MapSub_Street:
      "Repaired Myers' house generator and escaped from Lampkin Lane",
    DBD_EscapeNoBlood_Obsession:
      "Escaped for last with no bloodloss as obsession",
    DBD_FixSecondFloorGenerator_MapSwp_PaleRose:
      "Repaired steamboat generator and escaped from The Pale Rose",
    DBD_DLC3_Camper_Stat1: "Hex totems cleansed",
    DBD_HitNearHook: "Protected survivors after the unhook",
    DBD_Camper8_Stat1: "Damaged generators repaired (once per generator)",
    DBD_Camper8_Stat2: "Vaults while in chase",
    DBD_Camper9_Stat2: "Escaped after been injured for half of the trail",
    DBD_FixSecondFloorGenerator_MapBrl_MaHouse:
      "Repaired dwelling generator and escaped from Mother's Dwelling",
    DBD_DLC7_Camper_Stat1: "Chest searched",
    DBD_DLC7_Camper_Stat2: "Exit gates opened",
    DBD_DLC8_Camper_Stat1: "Escaped after getting downed once",
    DBD_Event1_Stat2: "Chest searched in the basement",
    DBD_FixSecondFloorGenerator_MapFin_Hideout:
      "Repaired bathroom generator and escaped from The Game",
    DBD_DLC9_Camper_Stat1: "Vaults making the killer miss",
    DBD_FixSecondFloorGenerator_MapAsy_Chapel:
      "Repaired chapel generator and escaped from Father Campbell's Chapel",
    DBD_Chapter9_Camper_Stat1: "Unhooked yourself",
    DBD_FixSecondFloorGenerator_MapHti_Manor:
      "Repaired residence generator and escaped from Family Residence",
    DBD_Chapter10_Camper_Stat1: "Hooks broken",
    DBD_FixSecondFloorGenerator_MapKny_Cottage:
      "Repaired chalet generator and escaped from Mount Ormond Resort",
    DBD_Chapter11_Camper_Stat1_float: "Healed survivors while injured",
    DBD_FixSecondFloorGenerator_MapBrl_Temple:
      "Repaired temple basement generator and escaped from The Temple of Purgation",
    DBD_Chapter12_Camper_Stat1: "Escaped from the killers grasp",
    DBD_Chapter12_Camper_Stat2: "Escaped through the hatch while crawling",
    DBD_FixSecondFloorGenerator_MapQat_Lab:
      "Repaired isolation room generator and escaped from The Underground Complex",
    DBD_FixSecondFloorGenerator_MapHti_Shrine:
      "Repaired upper shrine generator and escaped from Sanctum of Wrath",
    DBD_Chapter14_Camper_Stat1:
      "Protection hits while the killer was carrying a survivor",
    DBD_FixSecondFloorGenerator_MapUkr_Saloon:
      "Repaired saloon generator and escaped from Dead Dawg Saloon",
    DBD_Chapter15_Camper_Stat1: "Survivors healed from dying to injured state",
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchStats(values.steamId);
  };

  const fetchStats = async (steamId: string) => {
    const response = await fetch(
      `/v0002/?appid=381210&key=60CC7208B3EA2ABFA86557BBB788C2B8&steamid=${steamId}`
    );
    const data = await response.json();
    const killerStatsMap = await data.playerstats.stats.filter((item: any) => {
      return killerStatLookup[item.name];
    });
    const survivorStatsMap = await data.playerstats.stats.filter(
      (item: any) => {
        return survivorStatLookup[item.name];
      }
    );
    const genericStatsMap = await data.playerstats.stats.filter((item: any) => {
      return genericStatLookup[item.name];
    });
    setKillerStats(await killerStatsMap);
    setSurvivorStats(await survivorStatsMap);
    setGenericStats(await genericStatsMap);
    setDbdStats(await data);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Your DBD Steam Stats!</h2>
          <p>
            If you play DBD on steam we can pull a bunch of cool stats for you,
            but first you are going to need your unique SteamID this is NOT any
            of your display names or login names, in order to get your id open
            steam and click on your user name in the top right and click account
            details steam id should now be the second line under your username.
          </p>
          <p>
            <img src={SteamInstructions} alt="Visual of above instructions" />
          </p>
        </Col>
      </Row>
      <Row>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Steam Id</Form.Label>
            <Form.Control
              name="steamId"
              value={values.steamId}
              onChange={onChange}
              type="number"
              placeholder="Enter Steam ID"
            />
            <Form.Text className="text-muted">
              We don't store any data
            </Form.Text>
          </Form.Group>
          <Button variant="link" type="submit">
            Get My Stats
          </Button>
        </Form>
      </Row>
      {dbdStats && (
        <>
          <Row>
            <Col>
              <ul>
                Achievements:
                {dbdStats.playerstats.achievements?.map((achievements, i) => {
                  return (
                    <li key={i}>
                      {achievements.name}: {achievements.achieved}
                    </li>
                  );
                })}
              </ul>
            </Col>
          </Row>
          <Row>
            {killerStats && (
              <Col>
                <h4>Killer Stats</h4>
                <ListGroup variant="flush">
                  {killerStats.map((stat, i) => {
                    return (
                      <ListGroup.Item key={i}>
                        {killerStatLookup[stat.name]} : {stat.value}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Col>
            )}
            {survivorStats && (
              <Col>
                <h4>Survivor Stats</h4>
                <ListGroup variant="flush">
                  {survivorStats.map((stat, i) => {
                    return (
                      <ListGroup.Item key={i}>
                        {survivorStatLookup[stat.name]} : {stat.value}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Col>
            )}
            {genericStats && (
              <Col>
                <h4>Generic Stats</h4>
                <ListGroup variant="flush">
                  {genericStats.map((stat, i) => {
                    return (
                      <ListGroup.Item key={i}>
                        {genericStatLookup[stat.name]} : {stat.value}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Col>
            )}
          </Row>
        </>
      )}
    </Container>
  );
};
