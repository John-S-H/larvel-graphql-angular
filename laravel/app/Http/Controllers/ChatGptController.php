<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatGptController extends Controller
{
    public function chat(Request $request)
    {
        $message = $request->input('message');

        // Make a request to the Chat GPT API
        $response = Http::post('https://api.openai.com/v1/chat/completions', [
            'prompt' => $message,
            'model' => 'gpt-3.5-turbo',
            'max_tokens' => 50,
        ])->throw();

        $reply = $response['choices'][0]['text'];

        return response()->json([
            'message' => $reply,
        ]);
    }
}
