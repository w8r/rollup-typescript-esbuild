import json from "./json.json";
import { D } from "./template";
import shader from "./vertex.glsl";

export class Hello {
  private json = json;
  static shader = shader;

  private d: D<number> = { a: [1, 2] };
}
