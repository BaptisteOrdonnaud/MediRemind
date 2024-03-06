import React ,{useState,useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView, Dimensions,TouchableWithoutFeedback,useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import 'moment/locale/fr'; 

moment.locale('fr');
const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

import moment from 'moment';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');


export default function HomeScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const { prenom, nom } = user;

  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);

  const currentDate = moment().format('dddd D MMMM YYYY');

  const weeks = React.useMemo(() => {
    const start = moment().add(week, 'weeks').startOf('week');

    return [-1, 0, 1].map(adj => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');

        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Bonjour {prenom} 👋🏼</Text>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>
      <View style={styles.picker}>
          <Swiper
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}
            onIndexChanged={ind => {
              if (ind === 1) {
                return;
              }
              setTimeout(() => {
                const newIndex = ind - 1;
                const newWeek = week + newIndex;
                setWeek(newWeek);
                setValue(moment(value).add(newIndex, 'week').toDate());
                swiper.current.scrollTo(1, false);
              }, 100);
            }}>
            {weeks.map((dates, index) => (
              <View
                style={[styles.itemRow, { paddingHorizontal: 16 }]}
                key={index}>
                {dates.map((item, dateIndex) => {
                  const isActive =
                    value.toDateString() === item.date.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => setValue(item.date)}>
                      <View
                        style={[
                          styles.item,
                          isActive && {
                            backgroundColor: '#A69AFC',
                            borderColor: '#A69AFC',
                          },
                        ]}>
                        <Text
                          style={[
                            styles.itemWeekday,
                            isActive && { color: '#fff' },
                          ]}>
                          {item.weekday}
                        </Text>
                        <Text
                          style={[
                            styles.itemDate,
                            isActive && { color: '#fff' },
                          ]}>
                          {item.date.getDate()}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>
     
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1DFFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width:windowDimensions,
    height:windowDimensions
  },
  headerContainer: {
    backgroundColor: '#E1DFFF',
    flexDirection: 'collumn',
    width: '100%',
    height: 90,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft:20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom:5,
    alignSelf:'flex-start',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#737373',
    alignSelf:'flex-start'
  },
  todayTreatment: {
    backgroundColor: 'white',
    width: 350,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  treatmentContainer: {
    width: 350,
    marginTop: 20,
    borderRadius: 10,
  },
  treatment: {
    backgroundColor: 'white',
    width: 350,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', // Ajout de la position relative pour que le positionnement absolu fonctionne
  },
  buttonModif: {
    position: 'absolute', // Position absolue par rapport au parent (traitement)
    bottom: 10, // Marge depuis le bas
    right: 10, // Marge depuis la droite
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 170, // Largeur du bouton
    borderRadius: 10,
    borderColor: '#7368BF',
    borderWidth: 1,
  },
  textButton: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  picker: {
    flex: 1,
    maxHeight: 80,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'white',
    borderRadius:30
  },
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemRow: {
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: '500',
    color: '#737373',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },  
});
