import asyncio
import edge_tts

async def main():
    with open("script.ssml", "r") as f:
        ssml_text = f.read()

    # edge_tts doesn't have an SSML method directly, but we can pass text.
    # Wait, edge-tts actually does NOT support SSML through the public api, it just converts text.
    pass

if __name__ == "__main__":
    asyncio.run(main())
