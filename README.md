# webapplication

css

1. moved cart right :  hidden sm:block ml-auto
2. moved footer to center : footer className="flex justify-center h-15"
3. managing grids in home page : className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-3
4. managing same size pictures : 

<img src={products.image}
                    alt={products.name}
                    className="image-container"
                >
                </img>
in global.css : 
.image-container {
  width: 300px; /* Set your desired width */
  height: 200px; /* Set your desired height */
  object-fit: cover; /* Ensure the image fills the container */
}


