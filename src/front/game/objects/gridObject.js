import { FONT_VT323 } from '../config/fonts';

export class GridObject {
    constructor(scene, cols) {
        this.scene = scene;
        this.cols = cols;
        this.colWidth = scene.sys.game.config.width / this.cols;
        this.gridCells = [];
    }

    createGrid() {

        //crea los textos  de numeros de columnas
        for (let i = 0; i < this.cols; i++) {
            const colCenterX = i * this.colWidth + this.colWidth / 2;
            this.gridCells.push({ x: colCenterX, col: i });
            const text = this.scene.add.text(
                colCenterX,
                this.scene.sys.game.config.height - 20, (i + 1).toString(),
                FONT_VT323);
            text.setOrigin(0.5, 0.5);
        }

        // crea las lineas de separación de las columnas
        const graphics = this.scene.add.graphics();
        graphics.lineStyle(3, 0xcccccc, 0.3);
        for (let i = 1; i < this.cols; i++) {
            const colLineX = i * this.colWidth;
            const dashLength = 8;
            const gapLength = 8;
            let currentY = 0;
            while (currentY < this.scene.sys.game.config.height) {
                graphics.beginPath();
                graphics.moveTo(colLineX, currentY);
                graphics.lineTo(colLineX, currentY + dashLength);
                graphics.strokePath();
                currentY += dashLength + gapLength;
            }
        }

        this.scene.gridCells = this.gridCells;
    }
}
