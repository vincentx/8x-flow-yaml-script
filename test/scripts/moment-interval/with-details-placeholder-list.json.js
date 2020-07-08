export const json = function (type) {
    return {
        "models": [
            {
                "id": "Order",
                "desc": "",
                "archetype": type,
                "attributes": [
                    {
                        "name": "created_at",
                        "type": "timestamp"
                    }
                ]
            },
            {
                "id": "Order Item",
                "desc": "",
                "archetype": "details",
                "attributes": []
            }
        ],
        "relationships": [
            {
                "source": "Order",
                "target": "Order Item",
                "type": "details"
            }
        ]
    }
}
