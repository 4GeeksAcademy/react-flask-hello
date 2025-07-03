// Clase para crear y gestionar las torretas
export class TurretObject {
    constructor(scene, health = 100, turretCount = 12, turretColumns = null) {
        this.scene = scene;
        this.health = health;
        this.turretCount = turretCount;
        this.turretColumns = turretColumns; // Array de índices de columna, o null para automático
        this.turrets = [];
    }

    createTurrets() {
        const cols = this.scene.gridCells.length;
        const colWidth = this.scene.sys.game.config.width / cols;
        const turretY = 100;
        this.turrets = [];
        let columnsToUse = [];
        if (Array.isArray(this.turretColumns) && this.turretColumns.length > 0) {
            columnsToUse = this.turretColumns;
        } else {
            columnsToUse = Array.from({ length: this.turretCount }, (_, i) => i);
        }
        for (let idx = 0; idx < columnsToUse.length; idx++) {
            const colIndex = columnsToUse[idx] - 1;
            const x = colIndex * colWidth + colWidth / 2;
            const turret = this.scene.physics.add.image(x, turretY, 'turret_vsc').setDisplaySize(50, 50);
            turret.setImmovable(true);
            turret.setData('col', colIndex);
            turret.setData('health', this.health);
            // Crear barra de vida vertical a la derecha
            const bar = this.scene.add.graphics();
            bar.setDepth(3);
            this.drawHealthBar(bar, turret.getData('health'));
            bar.x = turret.x + 30; 
            bar.y = turret.y - 25; 
            turret.healthBar = bar;
            this.turrets.push(turret);
        }
        this.scene.turrets = this.turrets;
    }

    drawHealthBar(bar, health) {
        bar.clear();
        const percent = Phaser.Math.Clamp(health / this.health, 0, 1);
        // Barra verde (vida restante)
        bar.fillStyle(0x00ff00, 1);
        bar.fillRect(0, 48 * (1 - percent), 4, 48 * percent);
        // Barra roja (vida perdida)
        bar.fillStyle(0xff0000, 1);
        bar.fillRect(0, 0, 4, 48 * (1 - percent));
    }

    receiveDamage(scene, turret, amount) {
        let health = Number(turret.getData('health'));
        const damage = amount;
        health -= damage;
        turret.setData('health', health);
        // Actualizar barra de vida
        if (turret.healthBar) {
            this.drawHealthBar(turret.healthBar, health);
        }
        if (health <= 0) {
            this.destroyTurret(turret);
        }
    }

    destroyTurret(turret) {
        turret.healthBar.destroy();
        turret.destroy();
        this.turrets = this.turrets.filter(t => t !== turret);
        this.scene.turrets = this.turrets;
    }

    // Método para disparar (placeholder, implementar lógica de disparo aquí)
    shoot(turret) {
        // Implementar lógica de disparo aquí
    }
}
