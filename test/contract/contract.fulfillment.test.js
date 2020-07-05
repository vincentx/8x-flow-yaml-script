import {describe, expect, test} from "@jest/globals";

import {parse} from "../../src/main";
import {yml} from '../utils'

describe('Contract Fulfillment Declaration', () => {
    test('should define fulfillment with request and confirmation', () => {
        let result = parse(yml('contract/fulfillment/with-fulfillment'));

        expect(result.models.length).toBe(3);

        let order_payment_request = result.models[1];
        expect(order_payment_request.id).toBe('Order Payment Request');
        expect(order_payment_request.archetype).toBe('fulfillment');

        let order_payment_confirmation = result.models[2];
        expect(order_payment_confirmation.id).toBe('Order Payment Confirmation');
        expect(order_payment_confirmation.archetype).toBe('fulfillment');

        expect(result.relationships.length).toBe(2);

        let order_order_payment_request = result.relationships[0];
        expect(order_order_payment_request.source).toBe('Order');
        expect(order_order_payment_request.target).toBe('Order Payment Request');
        expect(order_order_payment_request.type).toBe('fulfillment');

        let request_confirmation = result.relationships[1];

        expect(request_confirmation.source).toBe('Order Payment Request');
        expect(request_confirmation.target).toBe('Order Payment Confirmation');
        expect(request_confirmation.type).toBe('confirmation');
    });

    test('should accept comma separated fulfilment', () => {
        let result = parse(yml('contract/fulfillment/with-comma-separated-fulfillment'));

        expect(result.models.length).toBe(5);

        let order_payment_request = result.models[1];
        expect(order_payment_request.id).toBe('Order Payment Request');
        expect(order_payment_request.archetype).toBe('fulfillment');

        let order_payment_confirmation = result.models[2];
        expect(order_payment_confirmation.id).toBe('Order Payment Confirmation');
        expect(order_payment_confirmation.archetype).toBe('fulfillment');

        let shipping_request = result.models[3];
        expect(shipping_request.id).toBe('Shipping Request');
        expect(shipping_request.archetype).toBe('fulfillment');

        let shipping_confirmation = result.models[4];
        expect(shipping_confirmation.id).toBe('Shipping Confirmation');
        expect(shipping_confirmation.archetype).toBe('fulfillment');
    });

    test('should define fulfillment with map', () => {
        let result = parse(yml('contract/fulfillment/with-map-fulfillment'));

        expect(result.models.length).toBe(3);

        let order_payment_request = result.models[1];
        expect(order_payment_request.id).toBe('Order Payment Request');
        expect(order_payment_request.archetype).toBe('fulfillment');

        let order_payment_confirmation = result.models[2];
        expect(order_payment_confirmation.id).toBe('Order Payment Confirmation');
        expect(order_payment_confirmation.archetype).toBe('fulfillment');

        expect(result.relationships.length).toBe(2);
    });

    test('should throw exception if fulfillment with malformed data',() => {
        expect(() => parse(yml('contract/fulfillment/with-malformed')))
            .toThrow('Order fulfillment has malformed declaration');
    });

});