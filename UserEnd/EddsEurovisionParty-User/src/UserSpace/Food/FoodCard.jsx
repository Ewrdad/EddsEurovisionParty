import { Button } from "@/components/ui/button";
import { Grid } from "@mui/material";

export const FoodCard = ({ country, food }) => {
  return (
    <Grid>
      <Grid item size={12} className="text-2xl">
        {food.name}
      </Grid>
      {food.imageUrl && (
        <Grid item size={12} className="text-xl content-center">
          <img
            src={food.imageUrl}
            alt={food.name}
            className="h-40 w-full overflow-clip justify-center bg-amber-500 object-cover self-center"
          />
        </Grid>
      )}
      {food.description && (
        <Grid item size={12} className="text-xl">
          {food.description}
        </Grid>
      )}
      {food.recipeUrl && (
        <Grid item size={12} className="text-xl">
          <a
            href={food.recipeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            <Button className="bg-amber-600 hover:bg-amber-800 text-black text-xl p-4 w-full mt-2 h-1/3">
              Recipe
            </Button>
          </a>
        </Grid>
      )}
      {food.purchaseUrl && (
        <Grid item size={12} className="text-xl">
          <a
            href={food.purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            <Button className="bg-amber-600 hover:bg-amber-800 text-black text-xl p-4 w-full mt-2 h-1/3">
              Purchase
            </Button>
          </a>
        </Grid>
      )}
    </Grid>
  );
};
