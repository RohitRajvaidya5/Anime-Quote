import { src, dest, series } from 'gulp';
import clean from 'gulp-clean';
import imagemin from 'gulp-imagemin';

// Define your tasks using the imported functions
const cleanDist = () => {
  return src('dist/*', { read: false })
    .pipe(clean());
};

const optimizeImages = () => {
  return src('public/assets/*')
    .pipe(imagemin())
    .pipe(dest('dist/images'));
};

// Export the tasks using ES module syntax
export default series(cleanDist, optimizeImages);
