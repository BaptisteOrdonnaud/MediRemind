import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView, Dimensions,TouchableWithoutFeedback,useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import 'moment/locale/fr'; 
import moment from 'moment';
import Swiper from 'react-native-swiper';
moment.locale('fr');

const windowDimensions = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const { width } = Dimensions.get('window');

function Calendrier() {

    const swiper = useRef();
    const [value, setValue] = useState(new Date());
    const [week, setWeek] = useState(0);
    const [initialIndex, setInitialIndex] = useState(1);
  
    useEffect(() => {
      const currentDate = moment(value);
      const initialIndex = Math.floor(currentDate.diff(moment().startOf('week'), 'days') / 7) + 1;
      setInitialIndex(initialIndex);
  }, [value]);
  
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
        <View style={[styles.picker, { width: windowWidth * 0.95, height: windowHeight * 0.07}]}>
        <Swiper
          index={initialIndex}
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
    );
}

export default Calendrier;

const styles = StyleSheet.create({

    picker: {
        // flex: ,
        // maxHeight: windowHeight *0.08,
        paddingVertical: windowHeight *0.009,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'white',
        borderRadius:30,
        marginHorizontal:windowWidth *0.02,
        // marginVertical: windowHeight * 0.001
        // marginBottom:windowHeight * 0.03
      },
      item: {
        flex: 1,
        height: windowHeight *0.05,
        marginHorizontal: windowWidth *0.009,
        paddingVertical: windowHeight *0.001,
        paddingHorizontal: windowWidth *0.005,
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
        marginHorizontal: windowWidth * -0.03,
      },
      itemWeekday: {
        fontSize: 13,
        fontWeight: '500',
        color: '#737373',
        marginBottom: windowHeight *0.001,
      },
      itemDate: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111',
      },  

});