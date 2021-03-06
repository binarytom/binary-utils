import { fromJS } from 'immutable';
import { toPlainJS } from '../immutableChildrenToJS';

describe('toPlainJS', () => {
    it('should not throw when passed undefined', () => {
        expect(() => toPlainJS()).not.toThrow();
    });

    it('should return the same object if it is not immutable', () => {
        const obj = {};
        const actual = toPlainJS(obj);
        expect(obj).toEqual(actual);
    });

    it('should return equivalent object if it is immutable', () => {
        const obj = {
            someProp: 'someVal',
            anotherProp: 123,
        };
        const immutableObj = fromJS(obj);
        const actual = toPlainJS(immutableObj);
        expect(obj).toEqual(actual);
    });

    it('should not transform immutable children of plain object', () => {
        const obj = {
            someObj: {
                someProp: 'someVal',
                anotherProp: 123,
            },
        };
        const immutableObj = {
            someObj: fromJS({
                someProp: 'someVal',
                anotherProp: 123,
            }),
        };
        const actual = toPlainJS(immutableObj);
        expect(obj).not.toEqual(actual);
    });
});
