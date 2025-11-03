import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { FONT_VT323 } from '../config/fonts';

export class MainMenu extends Scene {
    logoTween;

    constructor() {
        super('MainMenu');
    }

    create() {


        const bg = this.add.image(0, 0, 'background').setOrigin(0);
        bg.displayWidth = this.sys.game.config.width;
        bg.displayHeight = this.sys.game.config.height;

        this.add.text(700, 550, '4Geeks', FONT_VT323).setDepth(100).setOrigin(0.5);

        const user_obj = this.registry.get('user');
        const user = user_obj?.display_name || 'Invitado';
        console.log(user)

        this.add.text(384, 50, `Bienvenido ${user}`, FONT_VT323).setDepth(100).setOrigin(0.5);

        EventBus.emit('current-scene-ready', this);

    }

    changeScene() {
        this.scene.start('Game');
    }


}
