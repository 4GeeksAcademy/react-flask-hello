import { Scene } from 'phaser';
import { audioAssets } from '../../../../public/assets/sfx/audioAssets';
import { imageAssets } from '../../../../public/assets/images/imageAssets';
import { EventBus} from '../EventBus';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(0, 0, 'background').setOrigin(0).setDisplaySize(768, 576);

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(384, 60, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(384 - 230, 60, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);
        });

    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        imageAssets.forEach(img => {
            this.load.image(img.key, img.path);
        });

        audioAssets.forEach(audio => {
            this.load.audio(audio.key, audio.path);
        });


    }

    create() {
        const bg = this.add.image(0, 0, 'background').setOrigin(0);
        bg.displayWidth = this.sys.game.config.width;
        bg.displayHeight = this.sys.game.config.height;

        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
