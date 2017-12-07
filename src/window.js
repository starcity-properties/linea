import { Feature } from './feature.js';

export class Window extends Feature {
    constructor(canvas, ...window) {
        super(canvas);
        this.paper = canvas.paper;
        this.windows = [];
        window.forEach((item) => {
            // add window information into this.windows
        });
        // styles?
    }

    add(newWindow) {
        // this.windows.push(something done with newWindow)
    }

    remove(id) {
        // do we want to remove certain windows?? if we do, how?
    }
};


export class Door extends Feature {
    constructor(canvas, ...door) {
        super(canvas);
        this.paper = canvas.paper;

        this.doors = [];
        door.forEach((item) => {
            // add door to this.doors
        });
        // styles?
    }

    add(newDoor) {
        // add new door to this.doors
    }

    // remove(id) ??
};


export class SlidingDoor extends Feature {
    constructor(canvas, ...slidingDoor) {
        super(canvas);
        this.paper = canvas.paper;

        this.slidingDoors = [];
        slidingDoor.forEach((item) => {
            // add sliding doors
        });
        // styles??
    }

    add(newSlidingDoor) {
        // add new sliding door
    }

    // remove(id) ??
};


export class InteriorWall extends Feature {
    constructor(canvas, ...interiorWall) {
        super(canvas);
        this.paper = canvas.paper;

        this.interiorWalls = [];
        interiorWall.forEach((item) => {
            // add interior wall
        });
        // styles??
    }

    add(newInteriorWall) {
        // add new interior wall
    }

    // remove(id) ??
}


export class Dresser extends Feature {
    constructor(canvas, ...dresser) {
        super(canvas);
        this.paper = canvas.paper;

        this.dressers = [];
        dresser.forEach((item) => {
            // add dressers
        });
        // style?
    }

    add(newDresser) {
        // add new dresser
    }

    // remove(id) ??
}

export class Bed extends Feature {
    constructor(canvas, ...bed) {
        super(canvas);
        this.paper = canvas.paper;

        this.beds = [];
        bed.forEach((item) => {
            // add each bed to vector
        });
        // style?
    }

    add(newBed) {
        // add new bed to existing data
    }

    // remove bed?
}

export class NightTable extends Feature {
    constructor(canvas, ...nightTable) {
        super(canvas);
        this.paper = canvas.paper;

        this.nightTables = [];
        nightTable.forEach((item) => {
            // add each night table
        });
        // style?
    }

    add(newNightTable) {
        // add new nighttable
    }

    // remove(id) ??
}
