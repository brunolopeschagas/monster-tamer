import { BATTLE_ASSET_KEYS, BATTLE_BACKGROUND_ASSET_KEYS, HEATL_BAR_ASSET_KEYS, MONSTER_ASSET_KEYS } from "../assets/asset-keys.js";
import Phaser from "../lib/phaser.js";
import { SCENE_KEYS } from "./scene-keys.js";

const BATTLE_MENU_OPTIONS = Object.freeze({
    FIGHT: 'FIGHT',
    SWITCH: 'SWITCH',
    ITEM: 'ITEM',
    FLEE: 'FLEE',
});

const battleTextStyle = {
    color: 'black',
    fontSize: '30px',
};

export class BattleScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.BATTLE_SCENE,
        });
    }

    create() {
        console.log(BattleScene.name + ' create');
        this.#renderBackgroundImage();
        this.#renderMonsters();

        const playerMonsterName = this.add.text(
            30,
            20,
            MONSTER_ASSET_KEYS.IGUANIGNITE,
            {
                color: '#7e3d3f',
                fontSize: '32px',
            }
        );
        this.add.container(
            556,
            318,
            [
                this.add.image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND).setOrigin(0),
                playerMonsterName,
                this.#createHealthBar(34, 34),
                this.add.text(
                    playerMonsterName.width + 35,
                    23,
                    'L5',
                    {
                        color: '#ed474b',
                        fontSize: '28px',
                    }
                ),
                this.add.text(
                    30,
                    55,
                    'HP',
                    {
                        color: '#ed474b',
                        fontSize: '28px',
                        fontStyle: 'italic',
                    }
                ),
                this.add.text(
                    443,
                    80,
                    '25/25',
                    {
                        color: '#7e3d3f',
                        fontSize: '16px',
                    }
                ).setOrigin(1, 0),
            ]
        );

        const enemyMonsterName = this.add.text(
            30,
            20,
            MONSTER_ASSET_KEYS.CARNODUSK,
            {
                color: '#7e3d3f',
                fontSize: '32px',
            }
        );
        this.add.container(
            0,
            0,
            [
                this.add.image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND).setOrigin(0),
                enemyMonsterName,
                this.#createHealthBar(34, 34),
                this.add.text(
                    enemyMonsterName.width + 35,
                    23,
                    'L5',
                    {
                        color: '#ed474b',
                        fontSize: '28px',
                    }
                ),
                this.add.text(
                    30,
                    55,
                    'HP',
                    {
                        color: '#ed474b',
                        fontSize: '28px',
                        fontStyle: 'italic',
                    }
                ),
            ]
        );

        this.#createMainInfoPane();
        this.add.container(
            520,
            448,
            [
                this.#createMainInfoSubPane(),
                this.add.text(55, 22, BATTLE_MENU_OPTIONS.FIGHT, battleTextStyle),
                this.add.text(240, 22, BATTLE_MENU_OPTIONS.SWITCH, battleTextStyle),
                this.add.text(55, 70, BATTLE_MENU_OPTIONS.ITEM, battleTextStyle),
                this.add.text(240, 70, BATTLE_MENU_OPTIONS.FLEE, battleTextStyle),
            ]
        );

        this.add.container(0, 448, 
            [
                this.add.text(55, 22, 'slash', battleTextStyle),
                this.add.text(240, 22, 'slash', battleTextStyle),
                this.add.text(55, 70, 'slash', battleTextStyle),
                this.add.text(240, 70, 'slash', battleTextStyle),
            ]
        );
    }


    #renderBackgroundImage() {
        this.add.image(0, 0, BATTLE_BACKGROUND_ASSET_KEYS.FOREST).setOrigin(0, 0);
    }

    #renderMonsters() {
        this.add.image(768, 144, MONSTER_ASSET_KEYS.CARNODUSK, 0);
        this.add.image(256, 316, MONSTER_ASSET_KEYS.IGUANIGNITE, 0).setFlipX(true);
    }

    #createHealthBar(x, y) {
        const letfCap = this.add.image(x, y, HEATL_BAR_ASSET_KEYS.LEFT_CAP).setOrigin(0, 0.5);
        const midleCap = this.add.image(letfCap.x + letfCap.width, y, HEATL_BAR_ASSET_KEYS.MIDDLE_CAP).setOrigin(0, 0.5);
        midleCap.displayWidth = 360;
        const rightCap = this.add.image(midleCap.x + midleCap.displayWidth, y, HEATL_BAR_ASSET_KEYS.RIGHT_CAP).setOrigin(0, 0.5);
        return this.add.container(x, y, [letfCap, midleCap, rightCap]);
    }

    #createMainInfoPane() {
        const padding = 4;
        const rectangleHeight = 124;
        this.add.rectangle(
            padding,
            this.scale.height - rectangleHeight - padding,
            this.scale.width - padding * 2,
            rectangleHeight,
            0xede4f3,
            1
        ).setOrigin(0)
            .setStrokeStyle(8, 0xe4434a, 1);
    }

    #createMainInfoSubPane() {
        const rectangleWidth = 500;
        const rectangleHeight = 124;
        return this.add.rectangle(
            0,
            0,
            rectangleWidth,
            rectangleHeight,
            0xede4f3,
            1
        ).setOrigin(0)
            .setStrokeStyle(8, 0x905ac2, 1);
    }

}