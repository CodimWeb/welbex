<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use App\Models\Post;


class PostController extends Controller
{
    public function create(PostRequest $request): JsonResponse {
        $data = $request->validated();
        $path = '';
        if($request->file('media')) {
            $path = '/storage/' . $request->file('media')->store('uploads', 'public');
        }
        $data['media'] = $path;
        $data['user_id'] = auth()->user()['id'];
        Post::create($data);
        return $this->getAll();
    }

    public function getAll() {
        $posts = Post::with('user')->get();

        return response()->json([
            'posts' => Post::with('user')->get(),
        ]);
    }

    public function getPost($id) {
        return response()->json([
            'post' => Post::where('id', $id)->first(),
        ]);
    }

    public function updatePost(Request $request) {
        $data = $request->all();
        $post = Post::where('id', $data['id'])->first();

        if($data['media'] != '') {
            $path = '';
            $path = '/storage/' . $request->file('media')->store('uploads', 'public');
            $post->media = $path;
            $post->mediaType = $data['mediaType'];
        }
        $post->title = $data['title'];
        $post->text = $data['text'];
        $result = $post->save();
        return response()->json([
            'result' => $result,
        ]);
    }

    public function delete(Request $request) {
        Post::destroy($request->id);
        return $this->getAll();
    }
}
