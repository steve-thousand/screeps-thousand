import { MovementService } from '../movement'

describe('MovementService', function () {
    test('toDirection', function () {
        expect(MovementService.toDirection(-8)).toBe(TOP_LEFT)
        expect(MovementService.toDirection(-1)).toBe(LEFT)
        expect(MovementService.toDirection(0)).toBe(TOP_LEFT)
        expect(MovementService.toDirection(1)).toBe(TOP)
        expect(MovementService.toDirection(2)).toBe(TOP_RIGHT)
        expect(MovementService.toDirection(7)).toBe(LEFT)
        expect(MovementService.toDirection(8)).toBe(TOP_LEFT)
        expect(MovementService.toDirection(9)).toBe(TOP)
        expect(MovementService.toDirection(10)).toBe(TOP_RIGHT)
        expect(MovementService.toDirection(17)).toBe(TOP)
    })
    test('Just verify that getNextDirection doesn\'t fail if we call it a lot', function () {
        for (let i = 0; i < 100; i++) {
            MovementService.getNextDirection(TOP);
        }
    })
})