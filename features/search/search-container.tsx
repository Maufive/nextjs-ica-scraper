import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  Box,
  Text,
  List,
  ListItem,
} from '@chakra-ui/react';
import { SearchIcon } from '@heroicons/react/solid';
import { API_BASE_URL } from '../../constants';

function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay], // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

interface SearchResult {
  _id: string;
  title: string;
}

const SearchContainer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[] | []>([]);
  const debouncedSearchTerm = useDebounce(searchQuery, 250);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value);
  };

  const fetchSearch = async (query: string) => {
    const response = await fetch(`${API_BASE_URL}search?query=${query}`).then((res) => res.json());
    setSearchResults(response);
  };

  useEffect(() => {
    if (debouncedSearchTerm.length > 2) {
      fetchSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const showResults: boolean = searchResults.length > 0;

  return (
    <Box p={{ base: 2, md: 4 }} position="relative">
      <InputGroup colorScheme="green">
        <InputLeftElement
          pointerEvents="none"
        >
          <Icon as={SearchIcon} color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Sök recept"
          onChange={handleChange}
          value={searchQuery}
        />
      </InputGroup>
      {showResults && (
      <List marginTop={1}>
        {searchResults.map((result: SearchResult) => (
          <Link
            key={result._id}
            passHref
            href={`/recept/${result._id}`}
          >
            <ListItem
              layout
              p={3}
              bg={useColorModeValue('gray.100', 'gray.900')}
              borderBottom={1}
              borderColor={useColorModeValue('gray.300', 'gray.700')}
              borderStyle="solid"
              _last={{
                border: 'none',
              }}
            >
              <Text>{result.title}</Text>
            </ListItem>
          </Link>
        ))}
      </List>
      )}
    </Box>
  );
};

export default SearchContainer;
