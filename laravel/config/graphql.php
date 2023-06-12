<?php

return [
    'default' => 'default',
    'schemas' => [
        'default' => [
            'register' =>
                [base_path('graphql/my-schema.graphql')],
            'query' => [
                // Add your queries here
            ],
            'mutation' => [
                // Add your mutations here
            ],
        ],
    ],
    'auth' => [
        // ...
    ],
];