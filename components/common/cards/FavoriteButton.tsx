import React, {useState} from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Icon } from 'react-native-elements';
import { ViewStyle, StyleProp } from 'react-native';

type FavoriteButtonProps = {
  isFavorite: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const FavoriteButton = ({ isFavorite, style }: FavoriteButtonProps) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handlePress = () => {
    setFavorite(!favorite);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={style}>
      <Icon
        name={favorite ? 'heart' : 'heart-o'}
        type="font-awesome"
        color="#fff"
        size={25}
      />
    </TouchableOpacity>
  );
};

export default FavoriteButton;