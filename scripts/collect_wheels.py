import pathlib
import shutil


def main():

    cache_folder = r".cache/pypoetry/artifacts"
    location = pathlib.Path.home()
    location = location.joinpath(cache_folder)
    requirements = "nexus-wheels.txt"
    destination = "./wheels/"

    with open(requirements, "r") as reader:
        lines = reader.readlines()
        for line in lines:
            if (
                line.startswith("-e")
                or line.startswith("#")
                or line.startswith("cryptography==39.0.1")
            ):
                continue
            pattern = f'*{line.replace("==","*").replace("-","*").strip()}*.whl'
            files = list(location.rglob(pattern))
            pattern = f'*{line.replace("==","*").strip()}*.tar.gz'
            files.extend(list(location.rglob(pattern)))
            pattern = f'*{line.replace("==","*").replace("-","*").strip()}*.tar.gz'
            files.extend(list(location.rglob(pattern)))
            if len(files) < 1:
                print(f"No wheel found for {line}")
                raise FileNotFoundError(f"No wheel found for {line}")
            else:
                shutil.copy(files[0], pathlib.Path(destination))


if __name__ == "__main__":
    main()